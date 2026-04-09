<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('budgets', function (Blueprint $table) {
            $table->id();
            $table->enum('module', ['crops', 'animals', 'hr', 'inventory', 'general']);
            $table->enum('period', ['monthly', 'quarterly', 'yearly']);
            $table->smallInteger('year');
            $table->tinyInteger('month')->nullable()->comment('null for yearly budgets');
            $table->decimal('amount', 12, 2);
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['module', 'period', 'year', 'month']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('budgets');
    }
};
