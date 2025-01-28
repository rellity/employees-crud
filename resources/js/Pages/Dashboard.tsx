
import { AddEmployeeModal } from '@/Components/user/AddEmployeeModal';
import { EmployeeTable } from '@/Components/user/EmployeeTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EmployeeType } from '@/lib/types';
import { Head } from '@inertiajs/react';


export default function Dashboard({ employees }: { employees: EmployeeType[] }) {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex flex-row justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Employees
                    </h2>
                    <AddEmployeeModal />
                </div>

            }
        >

            <Head title="Dashboard" />


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <EmployeeTable data={employees} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
