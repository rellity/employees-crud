<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function dashboard() 
    {
        $employees = Employee::paginate(10);

        return Inertia::render("Dashboard", [
            'employees' => $employees,
        ]);
    }

    protected $casts = [
        'birthday' => 'date',
        'monthly_salary' => 'decimal:2',
    ];

    public function add(Request $request) 
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|in:male,female,others',
            'birthday' => 'required|date',
            'monthly_salary' => 'required|numeric|between:0,99999999.99',
        ]);

        Employee::create($validatedData);

        return back()->with('success', "yay! employee is added!");
    }

    public function remove($id) 
    {
        $employee = Employee::findOrFail($id);

        $employee->delete();

        return back();
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|in:male,female,others',
            'birthday' => 'required|date',
            'monthly_salary' => 'required|numeric|between:0,99999999.99',
        ]);

        $employee->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'gender' => $validated['gender'],
            'birthday' => $validated['birthday'],
            'monthly_salary' => $validated['monthly_salary'],
        ]);

        return back()->with('success', 'yay! employee is updated!');
    }
}
