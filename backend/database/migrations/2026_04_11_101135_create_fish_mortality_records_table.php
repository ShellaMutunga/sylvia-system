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
        Schema::create('fish_mortality_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pond_id')->constrained('animal_groups')->cascadeOnDelete();
            $table->date('recorded_date');
            $table->unsignedInteger('count');                    // number of deaths
            $table->string('species')->nullable();               // which species died
            $table->string('probable_cause')->nullable();        // disease, oxygen, stress, etc.
            $table->boolean('disease_outbreak')->default(false);
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
        Schema::dropIfExists('fish_mortality_records');
    }
};
