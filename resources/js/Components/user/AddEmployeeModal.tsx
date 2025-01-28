import { useState } from "react"
import { useForm } from "@inertiajs/react"
import { format } from "date-fns"
import { CalendarIcon, Plus } from "lucide-react"
import { Input } from "../ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { toast } from "sonner"


export function AddEmployeeModal() {
    const [open, setOpen] = useState(false)

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        gender: "other",
        birthday: "",
        monthly_salary: "",
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        post(route("employees.add"), {
            preserveState: true,
            onSuccess: () => {
                const message = "Employee created successfully!";
                setOpen(false);
                reset();
                toast.success(message)
            },

        });
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline"><Plus />Add New Employee</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add New Employee</SheetTitle>
                    <SheetDescription>Fill in the details to add a new employee to the system.</SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="space-y-8 mt-4">
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <Input
                            id="first_name"
                            value={data.first_name}
                            onChange={(e) => setData("first_name", e.target.value)}
                            className="mt-1"
                        />
                        {errors.first_name && <div className="text-red-500 text-sm mt-1">{errors.first_name}</div>}
                    </div>

                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <Input
                            id="last_name"
                            value={data.last_name}
                            onChange={(e) => setData("last_name", e.target.value)}
                            className="mt-1"
                        />
                        {errors.last_name && <div className="text-red-500 text-sm mt-1">{errors.last_name}</div>}
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <Select onValueChange={(value) => setData("gender", value)} value={data.gender}>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
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
                        <label htmlFor="monthly_salary" className="block text-sm font-medium text-gray-700">
                            Monthly Salary
                        </label>
                        <Input
                            id="monthly_salary"
                            type="number"
                            value={data.monthly_salary}
                            onChange={(e) => setData("monthly_salary", e.target.value)}
                            className="mt-1"
                        />
                        {errors.monthly_salary && <div className="text-red-500 text-sm mt-1">{errors.monthly_salary}</div>}
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? "Adding..." : "Add Employee"}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    )
}

