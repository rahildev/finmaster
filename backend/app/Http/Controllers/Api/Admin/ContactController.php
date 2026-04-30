<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Bütün əlaqə məlumatlarını göstər
     */
    public function index(): JsonResponse
    {
        $contacts = Contact::orderBy('sort_order')->get();
        return response()->json($contacts);
    }

    /**
     * Yeni əlaqə məlumatı yarat
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $contact = Contact::create($validator->validated());

        return response()->json($contact, 201);
    }

    /**
     * Tək əlaqə məlumatını göstər
     */
    public function show(string $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        return response()->json($contact);
    }

    /**
     * Əlaqə məlumatını yenilə
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'type' => 'sometimes|string|max:255',
            'label' => 'sometimes|string|max:255',
            'value' => 'sometimes|string|max:255',
            'icon' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $contact->update($validator->validated());

        return response()->json($contact);
    }

    /**
     * Əlaqə məlumatını sil
     */
    public function destroy(string $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(['message' => 'Əlaqə məlumatı silindi'], 200);
    }
}
