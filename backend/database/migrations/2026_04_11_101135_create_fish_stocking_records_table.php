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
        Schema::create('fish_stocking_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pond_id')->constrained('animal_groups')->cascadeOnDelete();
            $table->date('stocked_at');
            $table->string('source');                            // hatchery / supplier name
            $table->string('species');                           // tilapia, catfish, carp, etc.
            $table->unsignedInteger('fingerling_count');
            $table->decimal('avg_weight_g', 8, 2)->nullable();  // average weight in grams
            $table->decimal('purchase_cost', 10, 2)->nullable();
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
        Schema::dropIfExists('fish_stocking_records');
    }
};
