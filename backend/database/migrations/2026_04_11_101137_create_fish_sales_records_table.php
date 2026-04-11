<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fish_sales_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pond_id')->constrained('animal_groups')->cascadeOnDelete();
            $table->date('sale_date');
            $table->string('buyer_name');
            $table->string('buyer_contact')->nullable();
            $table->string('species');
            $table->unsignedInteger('fish_count')->nullable();
            $table->decimal('total_weight_kg', 10, 2);
            $table->decimal('price_per_kg', 10, 2);
            $table->decimal('total_amount', 12, 2)->storedAs('total_weight_kg * price_per_kg');
            $table->foreignId('recorded_by')->constrained('users')->restrictOnDelete();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fish_sales_records');
    }
};
