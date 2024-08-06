export default function ValidationEmailPage({ params }: { params: { email: string } }) {
    return (
        <div>
            <h1>ValidationEmailPage</h1>
            <p>Email: {params.email}</p>
        </div>
    );
}
