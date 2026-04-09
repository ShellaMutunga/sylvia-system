<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('national_id', 20)->unique();
            $table->foreignId('department_id')->nullable()->constrained()->nullOnDelete();
            $table->string('job_title');
            $table->enum('salary_type', ['monthly', 'daily', 'piece_rate']);
            $table->decimal('base_salary', 10, 2);
            $table->date('hire_date');
            $table->string('emergency_contact')->nullable();
            $table->string('bank_account')->nullable();
            $table->enum('status', ['active', 'inactive', 'terminated'])->default('active');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone', 20)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
