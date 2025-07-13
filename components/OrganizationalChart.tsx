
import React from 'react';

interface ChartNodeProps {
    name: string;
    title?: string;
    size?: 'small' | 'medium' | 'large';
}

const ChartNode = ({ name, title, size = 'medium' }: ChartNodeProps) => {
    const sizeClasses = {
        small: 'w-24 h-24',
        medium: 'w-28 h-28',
        large: 'w-32 h-32',
    };
    const nameClasses = {
        small: 'font-semibold text-sm',
        medium: 'font-bold text-base',
        large: 'font-extrabold text-lg',
    };

    return (
        <div className="flex flex-col items-center text-center space-y-2">
            <div className={`bg-background border-2 border-on-surface/70 rounded-full flex items-center justify-center shadow-lg ${sizeClasses[size]}`} aria-hidden="true">
                {/* Empty circle for visual representation based on image */}
            </div>
            <div className="w-36 h-14 flex flex-col justify-start items-center pt-1">
                <h4 className={`${nameClasses[size]} text-on-background whitespace-pre-line`}>{name}</h4>
                {title && <p className="text-on-surface text-sm">{title}</p>}
            </div>
        </div>
    );
};


interface StaffMember {
    name?: string;
    title?: string;
}

const StaffColumn = ({ staff }: { staff: StaffMember[] }) => {
    if (!staff || staff.length === 0) {
        return null;
    }

    return (
        <div className="w-full pt-8 flex justify-center">
            <ul className="list-none p-0 m-0 pl-8 relative">
                {/* Vertical Line. Stretches from parent connector to the middle of the last item. */}
                <div
                    className="absolute top-[-2rem] left-[-2px] bottom-[4.75rem] w-0.5 bg-on-surface/70"
                    aria-hidden="true"
                />

                {staff.map((person, index) => (
                    <li key={index} className="flex items-center relative mt-8 first:mt-0">
                        {/* Horizontal connector line from backbone to node */}
                        <div className="absolute left-[-2rem] top-1/2 -translate-y-1/2 w-8 h-0.5 bg-on-surface/70" aria-hidden="true"/>
                        <ChartNode name={person.name || ''} title={person.title} size="small" />
                    </li>
                ))}
            </ul>
        </div>
    );
};


const OrganizationalChart = () => {
    const establishmentStaff: StaffMember[] = [
        { name: 'Wasantha', title: 'DO' },
        { name: 'Senananda', title: 'DO' },
        { name: 'Ayomi', title: 'DO' },
        { name: 'Buddhi', title: 'DO' },
        { name: 'Anoma', title: 'DO' },
        { name: 'Vindya', title: 'MSO' },
        { name: 'Jeewani', title: 'DO' },
        { name: 'Dilrukshi', title: 'DO' },
        { name: 'Isuru', title: 'KKS' },
        { name: 'Waruni', title: 'KKS' },
    ];

    const accountsStaff: StaffMember[] = [
        { name: 'Asanka', title: 'DO' },
        { name: 'Dilip', title: 'DD' },
        { name: 'Sanka', title: 'DO' },
        { name: 'Asanka', title: 'MSO' },
    ];
    
    const emptyStaff: StaffMember[] = [{}, {}, {}];

    const departments = [
        { title: 'Establishment', staff: establishmentStaff },
        { title: 'Accounts', staff: accountsStaff },
        { title: 'Development', staff: emptyStaff },
        { title: 'Investigation', staff: emptyStaff },
        { title: 'Building\nMaterial Lab', staff: emptyStaff },
    ];

    return (
        <div className="overflow-x-auto py-8">
            <div className="flex flex-col items-center font-sans text-on-background min-w-[1800px]">
                {/* Top Level: Mr. Chandana */}
                <div className="flex flex-col items-center relative">
                    <ChartNode name="Mr. Chandana" title="DCLG" size="large" />
                    {/* Line down to the middle of the next level's bus line */}
                    <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-on-surface/70" aria-hidden="true" />
                </div>

                {/* Second Level Container */}
                <div className="w-full mt-8 relative flex justify-center">
                     {/* Horizontal Bus Line for Saranga and Dilani */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-0.5 bg-on-surface/70" aria-hidden="true" />

                    <div className="inline-flex justify-center items-start pt-8 gap-96">
                        {/* Left Side: Mr. Saranga */}
                        <div className="flex flex-col items-center relative">
                            {/* Vertical dropper from bus line */}
                            <div className="absolute top-[-2rem] w-0.5 h-8 bg-on-surface/70" aria-hidden="true" />
                            <ChartNode name="Mr. Saranga" title="Engineer" size="large" />
                            {/* No children as requested */}
                        </div>

                        {/* Right Side: Dilani and her children */}
                        <div className="flex flex-col items-center relative">
                            {/* Vertical dropper from bus line */}
                            <div className="absolute top-[-2rem] w-0.5 h-8 bg-on-surface/70" aria-hidden="true" />
                            <ChartNode name="Dilani" title="CMO" size="large" />
                            {/* Line connecting Dilani to her departments' bus line */}
                            <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-on-surface/70" aria-hidden="true" />

                            {/* Departments Section (nested here) */}
                            <div className="mt-8 relative">
                                {/* Horizontal Bus Line for Departments */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-0.5 bg-on-surface/70" aria-hidden="true" />

                                <div className="flex justify-around items-start pt-8 min-w-[1100px]">
                                    {departments.map((dept, deptIndex) => (
                                        <div key={deptIndex} className="flex flex-col items-center relative w-1/5">
                                            {/* Vertical Dropper */}
                                            <div className="absolute top-[-2rem] w-0.5 h-8 bg-on-surface/70" aria-hidden="true" />
                                            <ChartNode name={dept.title} size="medium" />

                                            {dept.staff && dept.staff.length > 0 && <StaffColumn staff={dept.staff} />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationalChart;