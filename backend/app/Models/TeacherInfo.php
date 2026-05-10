<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeacherInfo extends Model
{
    protected $table = 'teacher_info';

    protected $fillable = [
        'name',
        'title',
        'title_en',
        'bio',
        'bio_en',
        'photo_url',
        'photo_url_mobile',
        'experience',
        'experience_en',
        'achievements',
        'achievements_en',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
