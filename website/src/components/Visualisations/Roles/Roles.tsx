import React from "react";
import styles from "./Roles.module.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { TurnsInRoles, ProcessedRoleData } from "./Util/RoleTypes";
import { getProcessedRoleData } from "./Util/ProcessedRoleData";

const presidentColor = "#00bbf9";
const judgeColor = "#fee440";
const speakerColor = "#f15bb5";
const noneColor = "#b2bec3";

const data = getProcessedRoleData();

// const data: ProcessedRoleData = [
//     new ProcessedRoleElement("Team1", [
//         new TurnsInRoles(5, 0, 0, 0),
//         new TurnsInRoles(0, 0, 0, 2),
//         new TurnsInRoles(0, 1, 0, 0),
//         new TurnsInRoles(0, 0, 0, 0),
//     ]),
//     new ProcessedRoleElement("Team2", [
//         new TurnsInRoles(0, 3, 0, 0),
//         new TurnsInRoles(0, 0, 0, 3),
//         new TurnsInRoles(0, 0, 1, 0),
//         new TurnsInRoles(0, 0, 0, 1),
//     ]),
//     new ProcessedRoleElement("Team3", [
//         new TurnsInRoles(0, 0, 5, 0),
//         new TurnsInRoles(0, 0, 0, 3),
//         new TurnsInRoles(0, 0, 0, 0),
//         new TurnsInRoles(0, 0, 0, 0),
//     ]),
//     new ProcessedRoleElement("Team4", [
//         new TurnsInRoles(0, 0, 0, 3),
//         new TurnsInRoles(0, 2, 0, 0),
//         new TurnsInRoles(0, 0, 0, 3),
//         new TurnsInRoles(0, 0, 0, 0),
//     ]),
//     new ProcessedRoleElement("Team5", [
//         new TurnsInRoles(0, 0, 0, 5),
//         new TurnsInRoles(1, 0, 0, 0),
//         new TurnsInRoles(0, 1, 0, 0),
//         new TurnsInRoles(0, 0, 1, 0),
//     ]),
//     new ProcessedRoleElement("Team6", [
//         new TurnsInRoles(0, 0, 0, 5),
//         new TurnsInRoles(0, 0, 1, 0),
//         new TurnsInRoles(0, 0, 0, 2),
//         new TurnsInRoles(0, 0, 0, 0),
//     ]),
// ];

type CustomTooltipProps = {
    active: boolean;
    payload: [{ name: string; value: number; unit: string }];
    label: string;
};

const getTurnsInRoles = (
    data: ProcessedRoleData,
    name: string
): TurnsInRoles => {
    const roles = data.find((d) => d.name === name)?.roles;
    if (roles) {
        const turnsAsPresident = roles.reduce((acc, a) => acc + a.president, 0);
        const turnsAsJudge = roles.reduce((acc, a) => acc + a.judge, 0);
        const turnsAsSpeaker = roles.reduce((acc, a) => acc + a.speaker, 0);
        const turnsAsNone = roles.reduce((acc, a) => acc + a.none, 0);
        return new TurnsInRoles(
            turnsAsPresident,
            turnsAsJudge,
            turnsAsSpeaker,
            turnsAsNone
        );
    } else {
        console.log(`[VisRole] Could not find ${name} in data...`);
        return new TurnsInRoles();
    }
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active) {
        const turnsInRoles = getTurnsInRoles(data, label);
        const turns =
            turnsInRoles.president +
            turnsInRoles.judge +
            turnsInRoles.speaker +
            turnsInRoles.none;

        return (
            <div className={styles.customTooltip}>
                <p className={styles.label}>{label}</p>
                <p className={styles.content}>
                    Turns as President: {turnsInRoles.president} (
                    {(turnsInRoles.president * 100) / turns}%)
                </p>
                <p className={styles.content}>
                    Turns as Judge: {turnsInRoles.judge} (
                    {(turnsInRoles.judge * 100) / turns}%)
                </p>
                <p className={styles.content}>
                    Turns as Speaker: {turnsInRoles.speaker} (
                    {(turnsInRoles.speaker * 100) / turns}%)
                </p>
                <p className={styles.content}>
                    Turns without power: {turnsInRoles.none} (
                    {(turnsInRoles.none * 100) / turns}%)
                </p>
            </div>
        );
    }

    return null;
};

const Roles = () => {
    return (
        <ResponsiveContainer height={400} width="60%">
            <BarChart data={data} layout="vertical">
                <YAxis type="category" dataKey="name" />
                <XAxis type="number" />
                <Tooltip content={CustomTooltip} />
                <Legend
                    payload={[
                        {
                            value: "President",
                            type: "square",
                            id: "ID01",
                            color: presidentColor,
                        },
                        {
                            value: "Judge",
                            type: "square",
                            id: "ID02",
                            color: judgeColor,
                        },
                        {
                            value: "Speaker",
                            type: "square",
                            id: "ID03",
                            color: speakerColor,
                        },
                        {
                            value: "None",
                            type: "square",
                            id: "ID04",
                            color: noneColor,
                        },
                    ]}
                />
                {data[0].roles.map((_, i) => [
                    <Bar
                        dataKey={`roles[${i}].president`}
                        stackId="a"
                        fill={presidentColor}
                    />,
                    <Bar
                        dataKey={`roles[${i}].judge`}
                        stackId="a"
                        fill={judgeColor}
                    />,
                    <Bar
                        dataKey={`roles[${i}].speaker`}
                        stackId="a"
                        fill={speakerColor}
                    />,
                    <Bar
                        dataKey={`roles[${i}].none`}
                        stackId="a"
                        fill={noneColor}
                    />,
                ])}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Roles;
