import React from 'react';


export default ({evaluacionesLength}) => {

    let thead = [];

    thead.push(<th key={"cha"}>A-E</th>);

    for (let i = 0; i < evaluacionesLength; i++) {
        thead.push(<th key={"ch-" + i}>E<sub>{i}</sub> </th>);
    }

    return (
        <thead>{thead}</thead>
    );
};
