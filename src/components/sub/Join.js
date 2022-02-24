import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function Join() {
    //state로 관리할 초기 value값들
    const initVal = {
        userid: "",
        pwd1: "",
        pwd2: "",
        email: "",
        comments: "",
        gender: "",
        interests: "",
        edu: "",
    };
    //useState로 초기 value값을 state에 담아서 관리 시작
    const [val, setVal] = useState(initVal);
    const [err, setErr] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [success, setSuccess] = useState(false);

    //input에 변화점이 생길때마다 실행될 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(`name:${name}, value:${value}`);
        //현재 비어있는 초기 객체값을 내가 현재 입력하고 있는 새로운 value값으로 계속 덮어쓰기
        setVal({ ...val, [name]: value });
        // console.log(val);
    };

    const handleCheck = (e) => {
        const { name } = e.target;
        const isCheck = e.target.checked;
        setVal({ ...val, [name]: isCheck });
        console.log(isCheck);
    };
    const handleSelect = (e) => {
        const { name } = e.target;
        //console.log(e.target.options);
        const isSelected = e.target.options[e.target.selectedIndex].value;
        setVal({ ...val, [name]: isSelected });
    };
    //submit이벤트 발생하면 실행되는 함수
    const handleSubmit = (e) => {
        //일단 기본 전송을 막음
        e.preventDefault();
        setIsSubmit(true);
        //setErr로  기존의 err값을 변경
        //변경할 err객체내용을 반환해주는 check함수 호출
        setErr(check(val));
        // console.log(err);
        // console.log(val);
    };

    const text =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptates iure enim repudiandae quidem. Optio, veritatis libero mollitia magni praesentium voluptates unde sapiente incidunt molestias aperiam, dolorem architecto magnam veniam qui, nobis explicabo maxime consectetur molestiae deleniti quas tenetur? Sed recusandae laborum illum magnam magni praesentium, hic quis? Quam itaque sequi rem, doloribus nobis inventore omnis facere in dolor perspiciatis! Quas consectetur aperiam omnis aliquid exercitationem sequi dolor animi velit ad sapient dolor sit amet consectetur adipisicing elit. Non voluptates iure enim repudiandae quidem. Optio, veritatis libero mollitia magni praesentium voluptates unde sapiente incidunt molestias aperiam, dolorem architecto magnam veniam qui, nobis explicabo maxime consectetur molestiae deleniti quas tenetur? Sed recusandae laborum illum magnam magni praesentium, hic quis? Quam itaque sequi rem, doloribus nobis inventore omnis facere in dolor perspiciatis! Quas consectetur aperiam omnis aliquid exercitationem sequi dolor animi velit ad sapient aliquid exercitationem sequi dolor animi velit ad sapient. Quas consectetur aperiam omnis aliquid exercitationem sequi dolor animi velit ad sapient aliquid exercitationem sequi dolor animi velit ad sapient dolor animi velit ad sapientdolor animi velit ad sapient";

    //에러 객체를 반환하는 함수
    const check = (val) => {
        let errs = {};
        let eng = /[a-zA-Z]/;
        let num = /[0-9]/;
        let spc = /[!@#$%^&*]/;
        //현재 스테이트 val의 userid값이 비어있거나 5글자 미만일때만
        if (!val.userid || val.userid.length < 5) {
            errs.userid = "아이디를 5글자 이상 입력하세요.";
        }
        if (!val.pwd1 || val.pwd1.length < 5 || !eng.test(val.pwd1) || !num.test(val.pwd1) || !spc.test(val.pwd1)) {
            errs.pwd1 = "비밀번호는 5글자 이상, 문자,숫자,특수문자를 모두 포함.";
        }
        if (!val.email || val.email.length < 8) {
            errs.email = "이메일주소를 8글자 이상 입력하세요.";
        }
        if (val.pwd1 !== val.pwd2) {
            errs.pwd2 = "두개의 비밀번호를 동일하게 입력하세요.";
        }
        if (!val.comments || val.comments.length < 10) {
            errs.comments = "남기는말을 10글자 이상 입력하세요.";
        }
        if (!val.gender) {
            errs.gender = "성별을 선택하세요.";
        }
        if (!val.interests) {
            errs.interests = "관심사를 하나이상 선택하세요.";
        }
        if (!val.edu) {
            errs.edu = "학력을 선택해주세요.";
        }
        return errs;
    };

    //전송 버튼을 눌러서 err state값이 바뀔때에만 호출
    useEffect(() => {
        //해당 코드 블록안에서 err스테이트에 담겨있는 객체값이 비어있으면
        //모든 인증을 통과한 상태라서 회원가입 완료처리
        // console.log(err);
        const len = Object.keys(err).length;
        if (len === 0 && isSubmit) {
            console.log("인증 성공");
            setSuccess(true);
        } else {
            console.log("인증 실패");
            setSuccess(false);
        }
    }, [err]);
    return (
        <main id="main" className="join">
            <div className="sub-visual">
                <div className="inner">
                    <h1>Join</h1>
                </div>
            </div>
            <div className="inner">
                {success ? (
                    <div className="success-join">
                        <FontAwesomeIcon className="success-icon" icon={faCheckCircle} />
                        <p>Congratulations for your join</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className="h">회원가입 입력 폼 양식</legend>
                            <h3>
                                <label htmlFor="terms">Terms & Policy</label>
                            </h3>
                            <textarea name="terms" id="terms" cols="30" rows="10" readOnly defaultValue={text}></textarea>
                            <div className="agreement">
                                <input type="checkbox" name="agree" id="agree" />
                                <label htmlFor="agree">I agree this policy</label>
                            </div>
                            <div className="join-banner">
                                <p>Welcome to DOREMI</p>
                            </div>
                            <div className="member-info">
                                <h3>Member Information</h3>
                                <ul>
                                    <li>
                                        <label htmlFor="userid">USER ID </label>
                                        <input
                                            type="text"
                                            id="userid"
                                            name="userid"
                                            placeholder="아이디를 입력하세요"
                                            value={val.userid}
                                            onChange={handleChange}
                                        />
                                        <span className="err">{err.userid}</span>
                                    </li>
                                    <li>
                                        <label htmlFor="pwd1">PASSWORD</label>
                                        <input
                                            type="password"
                                            id="pwd1"
                                            name="pwd1"
                                            placeholder="비밀번호를 입력하세요"
                                            value={val.pwd1}
                                            onChange={handleChange}
                                        />
                                        <span className="err">{err.pwd1}</span>
                                    </li>
                                    <li>
                                        <label htmlFor="pwd2">RE-PASSWORD</label>
                                        <input
                                            type="password"
                                            id="pwd2"
                                            name="pwd2"
                                            placeholder="비밀번호를 재입력하세요"
                                            value={val.pwd2}
                                            onChange={handleChange}
                                        />
                                        <span className="err">{err.pwd2}</span>
                                    </li>
                                    <li>
                                        <label htmlFor="email">E-MAIL</label>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            placeholder="이메일 주소를 입력하세요"
                                            value={val.email}
                                            onChange={handleChange}
                                        />
                                        <span className="err">{err.email}</span>
                                    </li>
                                    <li>
                                        <label htmlFor="comments">COMMENTS</label>
                                        <textarea
                                            col="30"
                                            row="10"
                                            id="comments"
                                            name="comments"
                                            placeholder="남기는 말을 적어주세요"
                                            value={val.comments}
                                            onChange={handleChange}
                                        ></textarea>
                                        <span className="err">{err.comments}</span>
                                    </li>
                                    <li className="gender">
                                        <span>GENDER</span>
                                        <input type="radio" name="gender" id="male" onChange={handleCheck} />
                                        <label htmlFor="male">MALE</label>
                                        <input type="radio" name="gender" id="female" onChange={handleCheck} />
                                        <label htmlFor="female">FEMALE</label>
                                        <span className="err">{err.gender}</span>
                                    </li>
                                    <li className="interest">
                                        <span>INTERESTS</span>
                                        <input type="checkbox" id="sports" name="interests" onChange={handleCheck} />
                                        <label htmlFor="sports">Sports</label>

                                        <input type="checkbox" id="music" name="interests" onChange={handleCheck} />
                                        <label htmlFor="music">Music</label>

                                        <input type="checkbox" id="game" name="interests" onChange={handleCheck} />
                                        <label htmlFor="game">Game</label>

                                        <span className="err">{err.interests}</span>
                                    </li>
                                    <li>
                                        <label htmlFor="edu">EDUCATION</label>
                                        <select name="edu" id="edu" onChange={handleSelect}>
                                            <option value="">학력을 선택하세요</option>
                                            <option value="elementary-school">초등학교 졸업</option>
                                            <option value="middle-school">중학교 졸업</option>
                                            <option value="high-school">고등학교 졸업</option>
                                            <option value="college">대학교 졸업</option>
                                        </select>
                                        <span className="err">{err.edu}</span>
                                    </li>
                                    <li className="btns">
                                        <input type="reset" value="CANCEL" />
                                        <input type="submit" value="SEND" />
                                    </li>
                                </ul>
                            </div>
                        </fieldset>
                    </form>
                )}
            </div>
        </main>
    );
}

export default Join;
