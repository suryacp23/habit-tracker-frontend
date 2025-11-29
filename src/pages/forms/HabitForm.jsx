import React, { useEffect, useRef, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaChevronLeft, FaRegCalendarAlt, FaRegHeart, FaRegSmile, FaRegStar } from "react-icons/fa";
import { FaGlassWater, FaRegCalendarDays } from "react-icons/fa6";
import { FiMoon } from "react-icons/fi";
import { GoGoal } from "react-icons/go";
import { IoBookOutline, IoMusicalNotes, IoSunnySharp } from "react-icons/io5";
import { MdDashboardCustomize, MdOutlineFitnessCenter, MdOutlineWorkOutline } from "react-icons/md";
import { HabitService } from "../../services/habitService";
const options = [
	{ id: "daily", label: "Daily", icon: <FaRegCalendarAlt /> },
	{ id: "weekly", label: "Weekly", icon: <FaRegCalendarDays /> },
	// { id: "custom", label: "Custom", icon: <MdDashboardCustomize /> },
];
const categories = [
	{ id: "health", label: "Health", icon: <FaRegHeart /> },
	{ id: "fitness", label: "Fitness", icon: <MdOutlineFitnessCenter /> },
	{ id: "Mind", label: "Mind", icon: <FiMoon /> },
	{ id: "learn", label: "Learn", icon: <IoBookOutline /> },
	{ id: "work", label: "Work", icon: <MdOutlineWorkOutline /> },
	{ id: "create", label: "Create", icon: <IoMusicalNotes /> },
	{ id: "hydrate", label: "Hydrate", icon: <FaGlassWater /> },
	{ id: "morning", label: "Morning", icon: <IoSunnySharp /> },
	{ id: "focus", label: "Focus", icon: <AiFillThunderbolt /> },
	{ id: "social", label: "Social", icon: <FaRegSmile /> },
	{ id: "goals", label: "Goals", icon: <GoGoal /> },
	{ id: "other", label: "Other", icon: <FaRegStar /> },
];
const HabitForm = () => {
	const [active, setActive] = useState(options[0].id);
	// State to hold the dynamic style for the sliding indicator
	const [indicatorStyle, setIndicatorStyle] = useState({});
	// Ref for the container to calculate relative positions
	const containerRef = useRef(null);

	const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		frequency: "daily",
		category: "health",
	});

	const [validationErrors, setValidationErrors] = useState({
		name: false,
		description: false,
	});
	/**
	 * Calculates the width and left position of the active button
	 * relative to the container and updates the indicator style.
	 */
	const updateIndicator = () => {
		if (!containerRef.current) return;

		// Find the currently active button element using its ID
		// We use the attribute selector to find the button based on the active state ID
		const activeButton = containerRef.current.querySelector(`[data-id="${active}"]`);

		if (activeButton) {
			const containerRect = containerRef.current.getBoundingClientRect();
			const buttonRect = activeButton.getBoundingClientRect();

			// Calculate the position relative to the container
			const left = buttonRect.left - containerRect.left;
			const width = buttonRect.width;

			setIndicatorStyle({
				width: `${width}px`,
				transform: `translateX(${left}px)`,
			});
		} else {
			// Fallback for initial state if the element isn't immediately available
			setIndicatorStyle({ width: "0px", transform: "translateX(0px)" });
		}
	};

	// 1. Update indicator style when the active state changes
	useEffect(() => {
		// A small delay ensures the component has fully rendered and measured the buttons
		const timeoutId = setTimeout(updateIndicator, 0);
		return () => clearTimeout(timeoutId);
	}, [active]);

	// 2. Update indicator style on initial mount and window resize
	useEffect(() => {
		// Set initial position immediately on mount
		updateIndicator();

		// Listen for window resize to keep the indicator position correct
		window.addEventListener("resize", updateIndicator);

		return () => {
			window.removeEventListener("resize", updateIndicator);
		};
	}, []); // Empty dependency array means this runs once on mount

	const handleClick = (id) => {
		setFormData((prev) => {
			return { ...prev, frequency: id };
		});
		setActive(id);
		// The useEffect above will handle the style update after state change
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = { name: false, description: false };

		if (formData.name.trim() === "") {
			newErrors.name = true;
			isValid = false;
		}

		setValidationErrors(newErrors);
		return isValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Form Data:", formData);
			// Assuming HabitService is correctly imported and instantiated
			habitService.createHabit(formData);
			
			// You might want to clear the form or show a success message here
		} else {
			console.log("Validation Failed: Please fill in all required fields.");
		}
	};
	const habitService = new HabitService();
	return (
		<>
			<div className="  min-h-screen  px-2 max-w-[400px] mx-auto bg-background text-white">
				<div className="border-b-[1px] border-b-gray-500  relative text-center py-5">
					<div
						onClick={() => {
							history.back();
						}}
						className="absolute left-3.5 flex justify-center items-center h-5 cursor-pointer"
					>
						<FaChevronLeft className=" text-gray-600 " />
					</div>
					<h1 className="font-bold ">New Habit</h1>
				</div>
				<form className=" mx-auto flex flex-col gap-2 justify-around my-3">
					<div className=" flex flex-col gap-2 my-2">
						<label htmlFor="name" className=" text-gray-300 pl-2 text-xs">
							What do you want to track?
						</label>
						<input
							type="text"
							name="name"
							id="name"
							value={formData.name}
							onChange={(e) =>
								setFormData((prev) => {
									return { ...prev, name: e.target.value };
								})
							}
							className=" text-md bg-[#18181b] px-2.5 pt-4 pb-4.5 pl-3.5 rounded-xl placeholder:opacity-50 placeholder:text-[1rem] active:outline-none focus:outline-none  border-[3px]  border-[#0d0d0d] focus:border-[#615fff] transition-all duration-200"
							placeholder="e.g. Read 30 mins"
						/>
						{validationErrors.name && (
							<p className="text-red-400 text-xs pl-2 pt-1">Habit name cannot be empty.</p>
						)}
					</div>
					<div className="flex flex-col gap-2 my-2">
						<label htmlFor="description" className=" text-gray-300 pl-2 text-xs">
							Description <span className="opacity-55">(optional)</span>
						</label>
						<textarea
							type="text"
							name="description"
							id="description"
							value={formData.description}
							onChange={(e) =>
								setFormData((prev) => {
									return { ...prev, description: e.target.value };
								})
							}
							className=" text-md bg-[#18181b] px-2.5 pt-3.5 pb-4 pl-3.5 rounded-xl placeholder:opacity-50 placeholder:text-[1rem] active:outline-none focus:outline-none  border-[3px]  border-[#0d0d0d] focus:border-blue-500 resize-none h-30 transition-all duration-200"
							placeholder="Add details about your goal"
						></textarea>
					</div>
					<div className="flex flex-col gap-2 my-2">
						<label htmlFor="description" className=" text-gray-300 pl-2 text-sm">
							How often?
						</label>
						<div
							ref={containerRef}
							className="relative flex py-2 bg-[#18181b] rounded-xl shadow-2xl"
						>
							{/* Sliding Indicator Background Box
            - absolute position within the relative parent
            - transition-all for the smooth gliding effect
            - The style is dynamically set by the useEffect hook
          */}
							<div
								className="absolute top-2 bottom-2  border-[2px] border-indigo-700/70 bg-[#27272a] rounded-lg shadow-lg transition-all duration-300 ease-in-out"
								style={indicatorStyle}
							></div>

							{/* Map through options to create buttons */}
							{options.map((option) => (
								<div
									key={option.id}
									// Added data-id attribute for robust element selection in updateIndicator
									data-id={option.id}
									onClick={() => handleClick(option.id)}
									// Ensure div takes equal space (flex-1)
									className={`
                flex-1 z-10 px-1 py-4 mx-1 rounded-lg text-sm font-medium 
                flex items-center justify-center space-x-2 transition-colors 
                
                ${
							active === option.id
								? "text-white font-bold" // Active text color is white
								: "text-gray-400 hover:text-gray-200" // Inactive text color
						}
              `}
								>
									{/* Icon using Unicode/Emoji */}
									<span className="text-xl">{option.icon}</span>
									{/* Label */}
									<span>{option.label}</span>
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-2 my-2">
						<label htmlFor="category" className=" text-gray-300 pl-2 text-sm">
							Category
						</label>
						<div className="grid grid-cols-4 gap-4 px-2 text-center">
							{categories.map((category) => (
								<div
									key={category.id}
									onClick={() => {
										setSelectedCategory(category.id);
										setFormData((prev) => {
											return { ...prev, category: category.id };
										});
									}}
									className={`flex flex-col gap-1 `}
								>
									<div
										className={` text-lg py-5 border-[1px] rounded-2xl flex justify-center items-center border-[#2a2929] transition-all duration-600 ease-in-out  bg-transparent ${
											category.id === selectedCategory
												? " bg-gradient-to-r from-pink-500 to-blue-700 font-bold text-2xl border-2 border-sky-400"
												: ""
										}  `}
									>
										{category.icon}
									</div>
									<label
										className={` text-xs text-gray-400 ${
											category.id === selectedCategory ? "text-white" : ""
										}`}
										htmlFor=""
									>
										{category.label}
									</label>
								</div>
							))}
						</div>
					</div>
					<button
						className=" py-3 bg-[#18181b] m-2 mb-4 cursor-pointer hover:scale-105 transition rounded-xl"
						type="submit"
						onClick={handleSubmit}
					>
						Save Habbit
					</button>
				</form>
			</div>
		</>
	);
};

export default HabitForm;
