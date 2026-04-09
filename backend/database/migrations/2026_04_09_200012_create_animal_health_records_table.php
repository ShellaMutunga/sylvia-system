<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('animal_health_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('animal_id')->constrained()->cascadeOnDelete();
            $table->enum('record_type', ['vaccination', 'treatment', 'checkup', 'deworming', 'other']);
            $table->date('date');
            $table->text('diagnosis')->nullable();
            $table->text('treatment')->nullable();
            $table->string('medication')->nullable();
            $table->decimal('cost', 10, 2)->nullable();
            $table->foreignId('vet_id')->nullable()->constrained('users')->nullOnDelete();
            $table->date('next_checkup_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('animal_health_records');
    }
};
