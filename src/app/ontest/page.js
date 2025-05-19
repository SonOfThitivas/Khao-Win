import React from 'react';

import { InfoCard } from '../components/Map';

function page() {
    const info_param = [];
    return (
        <div>
            <InfoCard info_param={info_param} />
        </div>
    );
}

export default page;