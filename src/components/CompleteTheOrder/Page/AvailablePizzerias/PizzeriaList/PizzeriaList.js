import React from "react";

import PizzeriaListRow from "./PizzeriaListRow/PizzeriaListRow";

const PizzeriaList = props => {
	const {
		pizzerias,
		selectPizzeria,
		ingredients,
		isPizzeriaSelected,
		selectedPizzeria,
		unselectPizzeria
	} = props;

	return isPizzeriaSelected ? (
		<PizzeriaListRow
			pizzeria={selectedPizzeria}
			ingredients={ingredients}
			isPizzeriaSelected={isPizzeriaSelected}
			unselectPizzeria={unselectPizzeria}
		/>
	) : pizzerias.length === 0 ? (
		<h4 style={{ textAlign: "center" }}>
			Nie znaleziono żadnej pizzeri, która mogłaby zrobić taką pizzę...
		</h4>
	) : (
		pizzerias.map(pizzeria => (
			<PizzeriaListRow
				key={pizzeria.id}
				pizzeria={pizzeria}
				selectPizzeria={selectPizzeria}
				ingredients={ingredients}
			/>
		))
	);
};

export default PizzeriaList;