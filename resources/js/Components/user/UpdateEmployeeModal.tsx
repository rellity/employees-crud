import { useState, type ReactNode } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { router } from "@inertiajs/react"

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

import { cn } from "@/lib/utils"
import type { EmployeeType } from "@/lib/types"

interface UpdateEmployeeModalProps {
    employee: EmployeeType
    trigger: ReactNode
}

export function UpdateEmployeeModal({ employee, trigger }: UpdateEmployeeModalProps) {
    const [open, setOpen] = useState(false)
    const [updatedEmployee, setUpdatedEmployee] = useState(employee)

    const onUpdate = (id: number, data: Partial<EmployeeType>) => {
        router.put(route("employees.update", { id }), data, {
            preserveState: true,
            onSuccess: () => {
                setOpen(false)
            },
        })
    }

    const handleUpdate = () => {
        onUpdate(employee.id, updatedEmployee)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Update Employee</SheetTitle>
                    <SheetDescription>Edit the employee's details. Click save when you're done.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">First Name:</span>
                        <Input
                            value={updatedEmployee.first_name}
                            onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, first_name: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Last Name:</span>
                        <Input
                            value={updatedEmployee.last_name}
                            onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, last_name: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Gender:</span>
                        <Select
                            value={updatedEmployee.gender}
                            onValueChange={(value) => setUpdatedEmployee({ ...updatedEmployee, gender: value })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Birthday:</span>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "col-span-3 justify-start text-left font-normal",
                                        !updatedEmployee.birthday && "text-muted-foreground",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {updatedEmployee.birthday ? (
                                        format(new Date(updatedEmployee.birthday), "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={new Date(updatedEmployee.birthday)}
                                    onSelect={(date) => setUpdatedEmployee({ ...updatedEmployee, birthday: date?.toISOString() ?? "" })}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Salary:</span>
                        <Input
                            type="number"
                            value={updatedEmployee.monthly_salary}
                            onChange={(e) =>
                                setUpdatedEmployee({ ...updatedEmployee, monthly_salary: Number.parseFloat(e.target.value) })
                            }
                            className="col-span-3"
                        />
                    </div>
                </div>
                <SheetFooter>
                    <Button onClick={handleUpdate}>Save changes</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

