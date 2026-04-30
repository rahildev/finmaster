<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeacherInfo extends Model
{
    protected $table = 'teacher_info';

    protected $fillable = [
        'name',
        'title',
        'bio',
        'photo_url',
        'experience',
        'achievements',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
