<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('animal_productions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('animal_id')->constrained()->cascadeOnDelete();
            $table->enum('production_type', ['milk', 'eggs', 'wool', 'honey', 'meat', 'other']);
            $table->decimal('quantity', 10, 2);
            $table->string('unit', 20);
            $table->date('recorded_at');
            $table->string('quality_grade', 10)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('animal_productions');
    }
};
