
export const segmentationText: string = `Güterwagen werden anhand ihrer Bauweise und ihres Einsatzzweckes in eine Vielzahl von Gattungen kategorisiert. Abgesehen von einigen gattungsübergreifenden Schadensarten,
sind die häufigsten auftretenden Mängel und Schäden spezifisch für die jeweils betrachtete Wagengattung. Das Szenario ist demnach ideal um verschiedenste Ansätze der Deep
Learning basierten Computer Vision und ihre Übertragbarkeit, im Kontext der visuellen Inspektion in der Instandhaltung, zu evaluieren.
Die Anwendungsfälle sind zusätzlich durch verschiedene Herausforderungen charakterisiert, wie z.B. hohe Variation innerhalb einer Schadenskategorie, eine große Anzahl von
Schadenskategorien pro Bild, oder die Größe der zu erkennenden Schäden.`;


export const projectDescription: string = `
Die Leistungs- und Wettbewerbsfähigkeit des Schienengüterverkehrs (SGV) ist durch technische und operative Hemmnisse stark beeinträchtigt.
Ein großer Kostenblock in der Produktion von Schienentransportleistungen ist die laufende Überwachung und Erhaltung der Betriebstauglichkeit von Güterwagen,
wobei über 500 verschiedene Arten an Mängeln und Schäden festgestellt und behoben werden müssen. Insbesondere das Erkennen dieser Mängel und Schäden (Befundung)
ist heute ein aufwändiger, manueller Prozess. Im ASaG Konsortium wird daher die Digitalisierung und Automatisierung des Befundungsprozesses von Güterwagen in der
Zugbildung (wagentechnische Untersuchung) und in der Instandhaltungsbeauftragung untersucht und vorangetrieben. Hierbei kommen erprobte und neue Kameratechniken
sowie modernste Methoden der Bildverarbeitung und der Künstlichen Intelligenz zum Einsatz, die heute bereits in anderen Industriedomänen erfolgreich eingesetzt
werden, jedoch im SGV noch fehlen.<br/><br/>
Parallel wird untersucht, wie die Transformation vom heutigen manuellen Vorgehen hin zu (teil-)automatisierten Prozessen bzw.
der Kooperationen zwischen Mensch und digitaler Maschine (KI) sowohl aus Sicht der Mitarbeiter, aber auch aus unternehmerischer Perspektive gelingt.<br/><br/>
Das TMDT trägt zu diesem Gesamtziel durch die Konzeptionierung, Entwicklung und Evaluation der KI-Algorithmen für die teilautomatisierte Schadbefundung bei.
Das Ziel besteht darin, den aktuellen Stand der Technik im Bereich der Nutzung von künstlicher Intelligenz für die Lokalisierung und Klassifizierung von Fehlern
in Bilddaten einzubringen, etablierte Methoden aus dem akademischen Umfeld für den vorliegenden Anwendungsfall zu adaptieren und zu erweitern.
`;

export const explanationText: string = `Güterwagen werden anhand ihrer Bauweise und ihres Einsatzzweckes in eine Vielzahl von Gattungen kategorisiert. Abgesehen von einigen gattungsübergreifenden Schadensarten,
sind die häufigsten auftretenden Mängel und Schäden spezifisch für die jeweils betrachtete Wagengattung. Das Szenario ist demnach ideal um verschiedenste Ansätze der Deep
Learning basierten Computer Vision und ihre Übertragbarkeit, im Kontext der visuellen Inspektion in der Instandhaltung, zu evaluieren.
Die Anwendungsfälle sind zusätzlich durch verschiedene Herausforderungen charakterisiert, wie z.B. hohe Variation innerhalb einer Schadenskategorie, eine große Anzahl von
Schadenskategorien pro Bild, oder die Größe der zu erkennenden Schäden. `;

const holesDescription: string = `Löcher in Wagenböden aus Blech oder Holz stellen verschiedene Arten der Gefährung dar. Während die überwiegend kleinen Löcher in Blechböden bei Vibrationen während der Fahrt
zum Verlust von Ladung führen können, was einerseits einen (geringer) wirtschaftlichen Schaden darstellt, andererseits aber auch eine Gefährdung der Verkehrssicherheit
darstellen kann, wenn kleine Schotterartige Ladung auf die Gleise fällt. Bei Holzböden stellen Löcher und morsche Stellen in den Bodenbrettern vornehmlich eine Verletzungsgefahr
für das Lade- oder Wartungspersonal dar, während Schäden an den Ladungsträgern die ordnungsgemäße Sicherung der Ladung beeinträchtigen.`;

const stepsDescription: string = `Die an den vorderen und hinteren Enden der Wagen befindlichen (Eck-)Tritte werden von Wagenmeistern häufig genutzt um auf ihnen mit dem letzten Wagen eines Zuges vom Abrollberg ins
Rangiergleis mitzufahren. Übermäßig verbogene und dadurch eventuell auch instabil gewordene Bauteile stellen somit eine immense Gefahr für die Mitarbeiter dar und müssen frühzeitig
und zuverlässig erkannt werden.`;

const rungenDescription: string = `Rungen sind senkrecht stehende, seitliche Streben an der Ladefläche von Güterwagen, die in der Regel zur Abstützung der Ladung dienen. Sie sorgen zum Einen dafür das die Ladung, meist
Holz in Form von Balken oder Stämmen oder verschiedene Arten von Metallträgern oder -profilen, nicht seitlich von der Ladefläche rutschen kann und zum Anderen stellen sie Ankerpunkte
für die Ladungssicherung dar. Übermäßig verbogene und dadurch eventuell auch instabil gewordene Bauteile sind somit eine Gefahr für das Be- und Entladungspersonal als auch eine
Einschränkung der generellen Transportsicherheit und müssen frühzeitig und zuverlässig erkannt werden.`;

export const damageDescriptions: {} = {
  'steps': stepsDescription,
  'rungen': rungenDescription,
  'holes': holesDescription
}
