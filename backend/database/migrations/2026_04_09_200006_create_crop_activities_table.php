<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('crop_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crop_season_id')->constrained()->cascadeOnDelete();
            $table->enum('activity_type', ['planting', 'fertilizing', 'weeding', 'spraying', 'irrigation', 'harvesting', 'other']);
            $table->date('date');
            $table->integer('workers_involved')->nullable();
            $table->decimal('cost', 10, 2)->nullable();
            $table->foreignId('recorded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('crop_activities');
    }
};
