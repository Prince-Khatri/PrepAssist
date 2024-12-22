export function Files({ data }: any) {
    return (
        <>
            {data.length > 0 && (
                <>
                    {data.map((file: any) => (
                        <div key={file.id} className="h-40 w-40 bg-gray-200">
                            <a href={file.key} className="w-full h-full" target="_blank" rel="noreferrer">
                                {file.name}
                            </a>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
