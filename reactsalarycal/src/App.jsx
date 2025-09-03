import React, { useState } from 'react';
import './App.css';

function App() {
    // State for form inputs
    const [baseSalary, setBaseSalary] = useState('');
    const [otherAllowance, setOtherAllowance] = useState('');
    const [performanceBonus, setPerformanceBonus] = useState('700');
    const [otNormalDays, setOtNormalDays] = useState('');
    const [otHolidayDays, setOtHolidayDays] = useState('');
    const [leaveDays, setLeaveDays] = useState('');
    const [socialSecurity, setSocialSecurity] = useState('750');

    // State for calculation results
    const [result, setResult] = useState(0);
    const [otNormalPay, setOtNormalPay] = useState(0);
    const [otHolidayPay, setOtHolidayPay] = useState(0);
    const [holidayPay, setHolidayPay] = useState(0);
    const [travelAllowance, setTravelAllowance] = useState(0);
    const [accommodationAllowance, setAccommodationAllowance] = useState(0);
    const [totalLeaveDeduction, setTotalLeaveDeduction] = useState(0);
    const [hasCalculated, setHasCalculated] = useState(false);

    const calculateSalary = (e) => {
        e.preventDefault();

        const baseSalaryValue = parseFloat(baseSalary) || 0;
        const otherAllowanceValue = parseFloat(otherAllowance) || 0;
        const performanceBonusValue = parseFloat(performanceBonus) || 0;
        const otNormalDaysValue = parseInt(otNormalDays) || 0;
        const otHolidayDaysValue = parseInt(otHolidayDays) || 0;
        const leaveDaysValue = parseInt(leaveDays) || 0;
        const socialSecurityValue = parseFloat(socialSecurity) || 0;

        const hourlyRate = baseSalaryValue / 30 / 8.5;
        const dailyRate = baseSalaryValue / 30;

        const calculatedOtNormalPay = hourlyRate * 1.5 * (otNormalDaysValue * 2);
        const calculatedOtHolidayPay = hourlyRate * 3.0 * (otHolidayDaysValue * 2);
        const calculatedHolidayPayAllowance = dailyRate * otHolidayDaysValue;

        const calculatedTravelAllowance = Math.max(0, (22 - leaveDaysValue) * 50);
        const calculatedAccommodationAllowance = Math.max(0, (30 - leaveDaysValue) * 40);

        const baseSalaryDeduction = (baseSalaryValue / 30) * leaveDaysValue;
        const otherAllowanceDeduction = (otherAllowanceValue / 30) * leaveDaysValue;
        const calculatedTotalLeaveDeduction = baseSalaryDeduction + otherAllowanceDeduction;

        const finalResult =
            (baseSalaryValue - baseSalaryDeduction) +
            (otherAllowanceValue - otherAllowanceDeduction) +
            calculatedOtNormalPay +
            calculatedOtHolidayPay +
            calculatedHolidayPayAllowance +
            calculatedTravelAllowance +
            calculatedAccommodationAllowance +
            performanceBonusValue -
            socialSecurityValue;

        setOtNormalPay(calculatedOtNormalPay);
        setOtHolidayPay(calculatedOtHolidayPay);
        setHolidayPay(calculatedHolidayPayAllowance);
        setTravelAllowance(calculatedTravelAllowance);
        setAccommodationAllowance(calculatedAccommodationAllowance);
        setTotalLeaveDeduction(calculatedTotalLeaveDeduction);
        setResult(finalResult);
        setHasCalculated(true);
    };

    const formatNumber = (num) => {
        return (num || 0).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <div className="mud-container">
            {/* Left: Input Form */}
            <div className="mud-paper">
                <form onSubmit={calculateSalary}>
                    <div className="form-group">
                        <label>Base Salary (THB)</label>
                        <input
                            type="number"
                            placeholder="e.g., 20000.00"
                            value={baseSalary}
                            onChange={(e) => setBaseSalary(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Other Allowance (THB)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={otherAllowance}
                            onChange={(e) => setOtherAllowance(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Performance Bonus (THB)</label>
                        <input
                            type="number"
                            placeholder="700.00"
                            value={performanceBonus}
                            onChange={(e) => setPerformanceBonus(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>OT Normal Days</label>
                        <input
                            type="number"
                            placeholder="0"
                            value={otNormalDays}
                            onChange={(e) => setOtNormalDays(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>OT Holiday Days</label>
                        <input
                            type="number"
                            placeholder="0"
                            value={otHolidayDays}
                            onChange={(e) => setOtHolidayDays(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Leave Days</label>
                        <input
                            type="number"
                            placeholder="0"
                            value={leaveDays}
                            onChange={(e) => setLeaveDays(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Social Security (THB)</label>
                        <input
                            type="number"
                            placeholder="750.00"
                            value={socialSecurity}
                            onChange={(e) => setSocialSecurity(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="calculate-button">
                        Calculate Salary
                    </button>
                </form>
            </div>

            {/* Right: Result */}
            <div className="mud-paper">
                {hasCalculated ? (
                    <>
                        <h2 className="mud-text-h5">Salary Breakdown</h2>
                        <h3 className="mud-text-h6 mud-text-secondary result-row">
                            <span className="result-label">Total Net Salary:</span>
                            <span className="bold-primary result-value">{formatNumber(result)} THB</span>
                        </h3>
                        <hr className="my-4" />

                        <h4 className="mud-text-subtitle1">Earnings:</h4>
                        <p className="mud-text-body2 result-row">
                            <span className="result-label">- Base Salary:</span>
                            <span className="result-value">{formatNumber(baseSalary)} THB</span>
                        </p>
                        <p className="mud-text-body2 result-row">
                            <span className="result-label">- Other Allowance:</span>
                            <span className="result-value">{formatNumber(otherAllowance)} THB</span>
                        </p>
                        <p className="mud-text-body2 result-row">
                            <span className="result-label">- Performance Bonus:</span>
                            <span className="result-value">{formatNumber(performanceBonus)} THB</span>
                        </p>
                        <p className="mud-text-body2 result-row">
                            <span className="result-label">- OT Pay (Normal):</span>
                            <span className="result-value">{formatNumber(otNormalPay)} THB</span>
                        </p>
                        <p className="mud-text-body2 result-row">
                            <span className="result-label">- OT Pay (Holiday):</span>
                            <span className="result-value">{formatNumber(otHolidayPay)} THB</span>
                        </p>
                        <p className="mud-text-body2 result-row">
                            <span className="result-label">- Holiday Pay:</span>
                            <span className="result-value">{formatNumber(holidayPay)} THB</span>
                        </p>
                        <p className="mud-text-body2 result-row">
                            <span className="result-label">- Travel Allowance:</span>
                            <span className="result-value">{formatNumber(travelAllowance)} THB</span>
                        </p>
                        <p className="mud-text-body2 result-row">
                            <span className="result-label">- Accommodation Allowance:</span>
                            <span className="result-value">{formatNumber(accommodationAllowance)} THB</span>
                        </p>

                        <h4 className="mud-text-subtitle1 mt-4">Deductions:</h4>
                        <p className="mud-text-body2 result-row">
                            <span className="result-label">- Total Leave Deduction:</span>
                            <span className="result-value">{formatNumber(totalLeaveDeduction)} THB</span>
                        </p>
                        <p className="mud-text-body2 result-row">
                            <span className="result-label">- Social Security Deduction:</span>
                            <span className="result-value">{formatNumber(socialSecurity)} THB</span>
                        </p>
                    </>
                ) : (
                    <p className="mud-text-body2">กรอกข้อมูลแล้วกด Calculate เพื่อดูผลลัพธ์</p>
                )}
            </div>

        </div>
    );
}

export default App;
