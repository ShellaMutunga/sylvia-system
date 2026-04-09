<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('animal_species', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('category', ['livestock', 'poultry', 'aquatic', 'other']);
            $table->integer('avg_lifespan')->nullable()->comment('years');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('animal_species');
    }
};
