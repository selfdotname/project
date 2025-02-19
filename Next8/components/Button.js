export default function Button({ children, sendRequest }) {

    return (
        <button onClick={sendRequest}>{children}</button>
    )
}