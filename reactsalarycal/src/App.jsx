import React, { useState } from 'react';
import './App.css'; // Assume some basic CSS for layout

function SalaryCalculator() {
    // State for form inputs
    const [baseSalary, setBaseSalary] = useState(0);
    const [otherAllowance, setOtherAllowance] = useState(0);
    const [performanceBonus, setPerformanceBonus] = useState(700);
    const [otNormalDays, setOtNormalDays] = useState(0);
    const [otHolidayDays, setOtHolidayDays] = useState(0);
    const [leaveDays, setLeaveDays] = useState(0);
    const [socialSecurity, setSocialSecurity] = useState(750);

    // State for calculation results and display
    const [result, setResult] = useState(0);
    const [otNormalPay, setOtNormalPay] = useState(0);
    const [otHolidayPay, setOtHolidayPay] = useState(0);
    const [holidayPay, setHolidayPay] = useState(0);
    const [travelAllowance, setTravelAllowance] = useState(0);
    const [accommodationAllowance, setAccommodationAllowance] = useState(0);
    const [totalLeaveDeduction, setTotalLeaveDeduction] = useState(0);
    const [hasCalculated, setHasCalculated] = useState(false);

    const calculateSalary = () => {
        // Convert string inputs to numbers
        const baseSalaryValue = parseFloat(baseSalary) || 0;
        const otherAllowanceValue = parseFloat(otherAllowance) || 0;
        const performanceBonusValue = parseFloat(performanceBonus) || 0;
        const otNormalDaysValue = parseInt(otNormalDays) || 0;
        const otHolidayDaysValue = parseInt(otHolidayDays) || 0;
        const leaveDaysValue = parseInt(leaveDays) || 0;
        const socialSecurityValue = parseFloat(socialSecurity) || 0;

        const hourlyRate = baseSalaryValue / 30 / 8.5;
        const dailyRate = baseSalaryValue / 30;

        // Calculate OT Pay
        const normalPay = hourlyRate * 1.5 * (otNormalDaysValue * 2);
        const holidayPayValue = hourlyRate * 3.0 * (otHolidayDaysValue * 2);

        // Calculate Holiday Pay
        const holidayPayAllowance = dailyRate * otHolidayDaysValue;

        // Calculate Allowances
        const travelAllowanceValue = Math.max(0, (22 - leaveDaysValue) * 50);
        const accommodationAllowanceValue = Math.max(0, (30 - leaveDaysValue) * 40);

        // Calculate Deductions
        const baseSalaryDeduction = (baseSalaryValue / 30) * leaveDaysValue;
        const otherAllowanceDeduction = (otherAllowanceValue / 30) * leaveDaysValue;
        const totalLeaveDeductionValue = baseSalaryDeduction + otherAllowanceDeduction;

        // Calculate Final Salary
        const finalResult =
            (baseSalaryValue - baseSalaryDeduction) +
            (otherAllowanceValue - otherAllowanceDeduction) +
            normalPay +
            holidayPayValue +
            holidayPayAllowance +
            travelAllowanceValue +
            accommodationAllowanceValue +
            performanceBonusValue -
            socialSecurityValue;

        // Update all state variables
        setOtNormalPay(normalPay);
        setOtHolidayPay(holidayPayValue);
        setHolidayPay(holidayPayAllowance);
        setTravelAllowance(travelAllowanceValue);
        setAccommodationAllowance(accommodationAllowanceValue);
        setTotalLeaveDeduction(totalLeaveDeductionValue);
        setResult(finalResult);
        setHasCalculated(true);
    };

    return (
        <div className="container">
            <div className="grid">
                <div className="card">
                    <form>
                        <div className="form-group">
                            <label>Base Salary (THB)</label>
                            <input type="number" value={baseSalary} onChange={(e) => setBaseSalary(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Other Allowance (THB)</label>
                            <input type="number" value={otherAllowance} onChange={(e) => setOtherAllowance(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Performance Bonus (THB)</label>
                            <input type="number" value={performanceBonus} onChange={(e) => setPerformanceBonus(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>OT Normal Days</label>
                            <input type="number" value={otNormalDays} onChange={(e) => setOtNormalDays(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>OT Holiday Days</label>
                            <input type="number" value={otHolidayDays} onChange={(e) => setOtHolidayDays(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Leave Days</label>
                            <input type="number" value={leaveDays} onChange={(e) => setLeaveDays(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Social Security (THB)</label>
                            <input type="number" value={socialSecurity} onChange={(e) => setSocialSecurity(e.target.value)} />
                        </div>
                        <button type="button" onClick={calculateSalary}>Calculate Salary</button>
                    </form>
                </div>

                {hasCalculated && (
                    <div className="card">
                        <h2>Salary Breakdown</h2>
                        <h3>Total Net Salary: <span>{result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</span></h3>
                        <hr />
                        <h4>Earnings:</h4>
                        <ul>
                            <li>- Base Salary: {baseSalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</li>
                            <li>- Other Allowance: {otherAllowance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</li>
                            <li>- Performance Bonus: {performanceBonus.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</li>
                            <li>- OT Pay (Normal): {otNormalPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</li>
                            <li>- OT Pay (Holiday): {otHolidayPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</li>
                            <li>- Holiday Pay: {holidayPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</li>
                            <li>- Travel Allowance: {travelAllowance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</li>
                            <li>- Accommodation Allowance: {accommodationAllowance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</li>
                        </ul>
                        <h4>Deductions:</h4>
                        <ul>
                            <li>- Total Leave Deduction: {totalLeaveDeduction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</li>
                            <li>- Social Security Deduction: {socialSecurity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SalaryCalculator;