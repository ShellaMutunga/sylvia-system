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
        Schema::create('water_quality_readings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pond_id')->constrained('animal_groups')->cascadeOnDelete();
            $table->timestamp('recorded_at');                    // daily, especially early morning
            $table->decimal('dissolved_oxygen', 5, 2)->nullable(); // mg/L, ideal 5.0-8.0
            $table->decimal('temperature_c', 5, 2)->nullable();  // °C, ideal 22-28
            $table->decimal('ph_level', 4, 2)->nullable();       // ideal 6.5-8.0
            $table->decimal('ammonia', 6, 4)->nullable();        // mg/L, ideal <0.1
            $table->decimal('nitrite', 6, 4)->nullable();        // mg/L, ideal <0.1
            $table->decimal('turbidity', 5, 2)->nullable();      // NTU
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
        Schema::dropIfExists('water_quality_readings');
    }
};
