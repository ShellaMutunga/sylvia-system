<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaction::with('account', 'recordedBy');

        if ($request->has('module')) {
            $query->where('module', $request->module);
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('from') && $request->has('to')) {
            $query->whereBetween('date', [$request->from, $request->to]);
        }

        return response()->json($query->latest('date')->paginate(50));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'account_id'  => 'required|exists:accounts,id',
            'type'        => 'required|in:income,expense',
            'category'    => 'nullable|string|max:100',
            'amount'      => 'required|numeric|min:0.01',
            'description' => 'required|string|max:255',
            'reference'   => 'nullable|string|max:100',
            'date'        => 'required|date',
            'module'      => 'sometimes|in:crops,animals,hr,inventory,general',
            'notes'       => 'nullable|string',
        ]);

        $data['recorded_by'] = $request->user()->id;
        $data['module'] ??= 'general';

        DB::transaction(function () use ($data, &$transaction) {
            $transaction = Transaction::create($data);

            // Update account balance
            $account = Account::find($data['account_id']);
            if ($data['type'] === 'income') {
                $account->increment('balance', $data['amount']);
            } else {
                $account->decrement('balance', $data['amount']);
            }
        });

        return response()->json($transaction->load('account', 'recordedBy'), 201);
    }

    public function show(Transaction $transaction)
    {
        return response()->json($transaction->load('account', 'recordedBy'));
    }

    // P&L summary for a date range
    public function summary(Request $request)
    {
        $from = $request->input('from', now()->startOfMonth()->toDateString());
        $to   = $request->input('to', now()->endOfMonth()->toDateString());

        $data = Transaction::whereBetween('date', [$from, $to])
            ->selectRaw('type, module, SUM(amount) as total')
            ->groupBy('type', 'module')
            ->get();

        $income  = $data->where('type', 'income')->sum('total');
        $expense = $data->where('type', 'expense')->sum('total');

        return response()->json([
            'from'       => $from,
            'to'         => $to,
            'income'     => $income,
            'expense'    => $expense,
            'profit'     => $income - $expense,
            'by_module'  => $data,
            'accounts'   => Account::select('name', 'type', 'balance')->get(),
        ]);
    }
}
