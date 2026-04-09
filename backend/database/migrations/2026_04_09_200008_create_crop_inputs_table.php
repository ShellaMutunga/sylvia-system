<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('crop_inputs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crop_season_id')->constrained()->cascadeOnDelete();
            $table->enum('input_type', ['fertilizer', 'pesticide', 'herbicide', 'seed', 'other']);
            $table->string('product_name');
            $table->decimal('quantity_used', 10, 2);
            $table->string('unit', 30);
            $table->decimal('cost', 10, 2)->nullable();
            $table->date('applied_at');
            $table->foreignId('applied_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('crop_inputs');
    }
};
