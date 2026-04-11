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
        Schema::create('water_exchange_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pond_id')->constrained('animal_groups')->cascadeOnDelete();
            $table->date('date');
            $table->decimal('volume_in_liters', 10, 2)->nullable();
            $table->decimal('volume_out_liters', 10, 2)->nullable();
            $table->string('treatment_applied')->nullable();     // e.g. lime, salt, probiotics
            $table->decimal('treatment_quantity', 8, 2)->nullable();
            $table->string('treatment_unit', 20)->nullable();
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
        Schema::dropIfExists('water_exchange_records');
    }
};
