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
        Schema::create('fish_growth_samples', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pond_id')->constrained('animal_groups')->cascadeOnDelete();
            $table->date('sampled_at');
            $table->unsignedInteger('sample_size');              // number of fish sampled
            $table->decimal('avg_weight_g', 8, 2);              // average weight in grams
            $table->decimal('avg_length_cm', 6, 2)->nullable(); // average length in cm
            $table->decimal('target_weight_g', 8, 2)->nullable(); // target for this stage
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
        Schema::dropIfExists('fish_growth_samples');
    }
};
