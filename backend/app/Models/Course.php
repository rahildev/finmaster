<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'name',
        'name_en',
        'heading',
        'heading_en',
        'description',
        'description_en',
        'duration',
        'duration_en',
        'price',
        'image_url',
        'image_url_mobile',
        'page_content',
        'page_content_en',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'sort_order' => 'integer',
        'is_active' => 'boolean',
        'page_content' => 'array',
        'page_content_en' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function videos()
    {
        return $this->hasMany(Video::class);
    }
}
