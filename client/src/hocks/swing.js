export default function Swing(condition, setCondition) {
    if (condition === 'chessWhite') {
        setCondition('chessBlack')
    } else {
        setCondition('chessWhite')
    }
}