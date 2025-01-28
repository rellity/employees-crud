<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function dashboard() 
    {
        $employees = Employee::all();

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
            'gender' => 'required|in:male,female',
            'birthday' => 'required|date',
            'monthly_salary' => 'required|numeric|between:0,99999999.99',
        ]);

        Employee::create($validatedData);

        return Inertia::render("Dashboard", [
            'employees' => Employee::all()
        ]);
    }

    public function delete_employee(Request $request) 
    {
        
    }
}
