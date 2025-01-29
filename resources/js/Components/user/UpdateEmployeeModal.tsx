import { useState, type ReactNode } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm, usePage } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { EmployeeType } from "@/lib/types"
import { toast } from "sonner"

interface UpdateEmployeeModalProps {
    employee: EmployeeType
    trigger: ReactNode
}

export function UpdateEmployeeModal({ employee, trigger }: UpdateEmployeeModalProps) {
    const [open, setOpen] = useState(false)

    const { flash } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        first_name: employee.first_name,
        last_name: employee.last_name,
        gender: employee.gender,
        birthday: employee.birthday,
        monthly_salary: `${employee.monthly_salary}`,
    })


    const handleUpdate = (e: React.FormEvent) => {
        const id = employee.id
        e.preventDefault();
        put(route("employees.update", { id }), {
            preserveState: true,
            onSuccess: () => {
                setOpen(false);
                toast.success(flash.success)
            },
        })
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Update Employee</SheetTitle>
                    <SheetDescription>Edit the employee's details. Click save when you're done.</SheetDescription>
                </SheetHeader>
                <form onSubmit={handleUpdate} className="grid gap-4 py-4">
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <Input
                            value={data.first_name}
                            onChange={(e) => setData("first_name", e.target.value)}
                            className="col-span-3"
                        />
                        {errors.first_name && <div className="text-red-500 text-sm mt-1">{errors.first_name}</div>}
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <Input
                            value={data.last_name}
                            onChange={(e) => setData("last_name", e.target.value)}
                            className="col-span-3"
                        />
                        {errors.last_name && <div className="text-red-500 text-sm mt-1">{errors.last_name}</div>}
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <Select
                            value={data.gender}
                            onValueChange={(value) => setData("gender", value)}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="others">Others(LGBTQ+)</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.gender && <div className="text-red-500 text-sm mt-1">{errors.gender}</div>}
                    </div>
                    <div>
                        <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                            Date of birth
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={`w-full mt-1 justify-start text-left font-normal ${!data.birthday && "text-muted-foreground"
                                        }`}
                                >
                                    {data.birthday ? format(new Date(data.birthday), "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={data.birthday ? new Date(data.birthday) : undefined}
                                    onSelect={(date) => setData("birthday", date ? format(date, "yyyy-MM-dd") : "")}
                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.birthday && <div className="text-red-500 text-sm mt-1">{errors.birthday}</div>}
                    </div>
                    <div>
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                            Salary
                        </label>
                        <Input
                            id="monthly_salary"
                            type="number"
                            value={data.monthly_salary}
                            onChange={(e) => setData("monthly_salary", e.target.value)}
                            className="col-span-3"
                        />
                        {errors.monthly_salary && <div className="text-red-500 text-sm mt-1">{errors.monthly_salary}</div>}
                    </div>
                    <SheetFooter>
                        <Button type="submit">{processing ? "Saving..." : "Save Changes"}</Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}

