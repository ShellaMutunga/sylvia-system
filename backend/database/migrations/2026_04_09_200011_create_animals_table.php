<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            $table->string('tag_number')->unique();
            $table->foreignId('animal_species_id')->constrained()->cascadeOnDelete();
            $table->foreignId('animal_group_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('zone_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name')->nullable();
            $table->enum('sex', ['male', 'female']);
            $table->date('dob')->nullable();
            $table->decimal('weight', 8, 2)->nullable()->comment('kg');
            $table->string('breed')->nullable();
            $table->enum('status', ['active', 'sold', 'deceased', 'transferred'])->default('active');
            $table->decimal('purchase_price', 10, 2)->nullable();
            $table->date('purchased_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
