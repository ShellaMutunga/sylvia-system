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
        Schema::create('fish_feed_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pond_id')->constrained('animal_groups')->cascadeOnDelete();
            $table->date('feed_date');
            $table->string('feed_type');                          // e.g. floating pellets, sinking pellets
            $table->decimal('feed_size_mm', 4, 1)->nullable();   // pellet size in mm
            $table->decimal('quantity_kg', 8, 2);                // total kg fed that day
            $table->unsignedTinyInteger('feedings_per_day')->default(2);
            $table->string('supplementary_feed')->nullable();     // Azolla (tilapia), BSF larvae (catfish)
            $table->decimal('supplementary_qty_kg', 8, 2)->nullable();
            $table->decimal('feed_cost', 10, 2)->nullable();
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
        Schema::dropIfExists('fish_feed_records');
    }
};
