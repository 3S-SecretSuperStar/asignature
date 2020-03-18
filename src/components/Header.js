import React from 'react';

import { newContextComponents } from "drizzle-react-components";

const { ContractData } = newContextComponents;


export default (props) => (

    <header className="App">
        <h1>
            P3 - Asignatura -
            <ContractData
                drizzle={props.drizzle}
                drizzleState={props.drizzleState}
                contract={"Asignatura"}
                method={"nombre"}
            />
            -
            <ContractData
                drizzle={props.drizzle}
                drizzleState={props.drizzleState}
                contract={"Asignatura"}
                method={"curso"}
                render={data => (
                    <>
                        (<em>{data}</em>)
                    </>
                )}
            />

        </h1>
    </header>
);
