<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = Product::all();
        return response()->json([
            'success' => true,
            'message' => 'List Semua Product',
            'data'    => $product
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([ // 1
            'name' => 'required',
            'color' => 'required',
            'price' => 'required',
            'stock' => 'required',
        ]);

        $product = Product::create($validated); // 2

        return response()->json([ // 3
            'success' => true,
            'message' => 'Product Created',
            'data'    => $product
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $product = Product::findOrFail($product->id);
        return response()->json([
            'success' => true,
            'message' => 'Detail Product',
            'data'    => $product
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([ // 1
            'name' => 'required',
            'color' => 'required',
            'price' => 'required',
            'stock' => 'required',
        ]);

        $product = Product::whereId($product->id)->update($validated); // 2

        return response()->json([ // 3
            'success' => true,
            'message' => 'Product Updated',
            'data'    => $product
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {

            $product = Product::findOrFail($product->id);
            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Product Deleted',
                'data'    => $product
            ], 200);
    }
}
