<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('crop_seasons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('field_id')->constrained()->cascadeOnDelete();
            $table->foreignId('crop_type_id')->constrained()->cascadeOnDelete();
            $table->date('planted_at');
            $table->date('expected_harvest_at');
            $table->date('actual_harvest_at')->nullable();
            $table->decimal('area_planted', 10, 2)->comment('hectares');
            $table->decimal('seed_quantity_used', 10, 2)->nullable();
            $table->enum('status', ['planned', 'active', 'harvested', 'failed'])->default('planned');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('crop_seasons');
    }
};
