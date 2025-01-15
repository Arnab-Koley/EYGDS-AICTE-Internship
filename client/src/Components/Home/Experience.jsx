import React, { useState } from 'react';
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const Experience = () => {
    const [experienceOn, setExperienceOn] = useState(false);
    const [customersOn, setCustomersOn] = useState(false);
    const [hostsOn, setHostsOn] = useState(false);

    return (
        <div className="py-20">
            <h1 className="text-4xl font-bold text-center mb-10">Our Achievements</h1>
            <div className="flex flex-col md:flex-row justify-around items-center max-w-4xl mx-auto space-y-10 md:space-y-0">
                
                <ScrollTrigger onEnter={() => setExperienceOn(true)} onExit={() => setExperienceOn(false)}>
                    <div className="text-center">
                        <h2 className="text-5xl font-bold text-blue-500">
                            <CountUp start={0} end={10} duration={4} delay={0} />+
                        </h2>
                        <p className="text-xl text-gray-700 mt-2">Years of Experience</p>
                    </div>
                </ScrollTrigger>

                <ScrollTrigger onEnter={() => setCustomersOn(true)} onExit={() => setCustomersOn(false)}>
                    <div className="text-center">
                        <h2 className="text-5xl font-bold text-green-500">
                            <CountUp start={0} end={10000} duration={4} delay={0} />+
                        </h2>
                        <p className="text-xl text-gray-700 mt-2">Customers Served</p>
                    </div>
                </ScrollTrigger>

                <ScrollTrigger onEnter={() => setHostsOn(true)} onExit={() => setHostsOn(false)}>
                    <div className="text-center">
                        <h2 className="text-5xl font-bold text-purple-500">
                            <CountUp start={0} end={5000} duration={4} delay={0} />+
                        </h2>
                        <p className="text-xl text-gray-700 mt-2">Hosts</p>
                    </div>
                </ScrollTrigger>

            </div>
        </div>
    );
}

export default Experience;
