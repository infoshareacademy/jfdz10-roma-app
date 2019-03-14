import React from "react";

class Description extends React.Component {
    render() {
        return (
            <div className="description">
                <h1 className="description__title">PIZZERIUM - ZJEDZ SWOJĄ WYMARZONĄ PIZZĘ</h1>
                <p className="description__paragraph">Skorzystaj z kreatora pizzy i stwórz własną pizzę, a my znajdziemy pizzerię, która zrobi ją dla ciebie.</p>
                <p className="description__paragraph">Znajdź najlepszą pizzę blisko swojego domu.</p>
                <p className="description__paragraph">Szukaj inspiracji przeglądając pizze innych użytkowników.</p>
                <p className="description__paragraph">Zapisz swoje ulubione kompozycje i pizzerie - zaoszczędzony w ten sposów czas wykorzystasz tak jak lubisz!</p>
            </div>
        )
    }
}

export default Description;