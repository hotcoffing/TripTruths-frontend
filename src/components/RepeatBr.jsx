// 지정한 count만큼 <br />을 배열로 생성하는 컴포넌트
const Space = ({ count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <br key={index} />
            ))}
        </>
    );
};

export default Space;