// "**word**" → highlighted word
function Highlighted({ text }: { text: string }) {
    return (
        <>
            {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
                part.startsWith('**') ? (
                    <span key={i} className="font-semibold text-ink">
                        {part.slice(2, -2)}
                    </span>
                ) : (
                    part
                ),
            )}
        </>
    );
}

export default Highlighted;
