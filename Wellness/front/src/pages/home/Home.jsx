import React from "react";
import './home.css'

export default function Home() {
    return (
        <div className="home">
            <div className="home-top-container">
                <div className="top-image" />
                <h1>Wellness</h1>
                {/* <div className="home-description">
                    <p>Do you know wellness<br/>Do you know wellness</p>
                    <p>Do you know wellness trends<br/>Do you know wellness trends</p>
                </div> */}
            </div>
            <div className="home-middle-container">
                <div className="middle-one">
                    <img src="/img1.jpeg" />
                    <div className="one-content">
                        <p className="top">
                            <span className="highlight">"건강은 가장 값진 트렌드입니다"</span>

                            <br/><br/>지금, 당신의 삶에 가장 필요한 웰니스가 시작됩니다.
                            <br/>Wellty는 최신 건강 정보, 과학적으로 검증된 웰빙 팁, 그리고 나만의 건강 루틴을 만들어줄 개인화된 컨텐츠까지 제공합니다.
                        
                            <br/><br/>Wellty의 목표는 단순히 건강해지는 것을 넘어, 당신이 가장 빛나는 모습으로 살아가도록 돕는 것입니다.
                            <br/>운동부터 식단, 멘탈 케어까지 "진짜 나를 아끼는 방법"을 함께 찾아보세요.

                            <br/><br/>트렌디한 건강 라이프, 이제 어렵지 않습니다.
                            <br/>이곳에서, 당신만의 웰니스 여정을 시작해보세요.

                            <br/><br/>지금, 더 나은 내일의 당신을 만나보세요
                        </p>

                        <p className="bottom">
                            <span className="highlight">"건강 트렌드, Wellty의 데이터로 더 현명하게 관리하세요!"</span>

                            <br/><br/>Wellty의 대시보드는 단순한 통계를 넘어, 당신의 건강을 위한 체계적인 정보를 제공합니다.
                            <br/>*어제와 오늘, 내일을 연결하는 데이터의 힘*으로 트렌드와 당신의 니즈를 한눈에 확인하세요!

                            <br/><br/>- 일별, 월별 검색량으로 건강 이슈의 흐름을 파악하고, 어떤 정보가 가장 중요한지 알 수 있게 해줍니다.
                            <br/>- PC와 Mobile별 검색률을 통해 어디서나 간편하게 트렌드를 비교하세요.
                            <br/>- 성별, 연령별 검색률을 분석해, 나와 비슷한 사람들은 어떤 건강 트렌드에 관심이 있는지 확인할 수 있습니다.
                            <br/>- 연관 키워드와 관련되 영상 추천으로, 건강과 웰니스에 대한 깊이 있는 정보를 탐구하세요.

                            <br/><br/>"당신만의 데이터로 건강을 완성하세요!"
                            <br/>어제보다 나은 오늘을 만들기 위해 필요한 모든 데이터를 Wellty의 대시보드에서 제공합니다!

                            <br/><br/>"클릭 한 번으로 웰니스 트렌드를 한눈에!!"
                        </p>
                    </div>
                </div>
                <div className="middle-two">
                    <div className="two-content">
                        <p>
                            <span className="highlight">"Wellty에서 건강한 소통의 장을 만나보세요!"</span>

                            <br/><br/>Wellty 이용자들과 소통하고 공감하며 함께 건강한 삶을 만들어 가요!

                            <br/><br/>- Physical, Social, Emotional, Mental, Environmental 다섯 가지 카테고리로 구성된 게시판에서<br/>당신의 생각을 자유롭게 나눌 수 있습니다.
                            <br/>- Wellty의 다른 사용자의 글이 마음에 든다면 ♥️를 눌러 응원을 보낼 수 있어요.<br/>댓글로도 소통하며 깊이 있는 대화를 이어갈 수 있습니다.
                            <br/>- 내 게시물이 마음에 들지 않는다면 언제든 수정하거나 삭제할 수 있습니다.

                            <br/><br/>Wellty는 내가 작성한 모든 글을 Users 페이지에서 관리하고 확인할 수 있는 편리한 기능을 제공합니다.

                            <br/><br/>- 내가 쓴 글에 댓글이 달리면 즉시 알림으로 확인할 수 있어, 중요한 소통의 기회를 놓치지 않을 거예요~


                            <br/><br/><br/><span className="highlight">"소통을 통해 더 건강한 나와 세상을 만들어보세요!"</span>

                            <br/><br/>Wellty는 건강에 대한 다양한 관점을 공유하며, 이용자들 간의 상호작용을 통해 더 나은 삶과 건강의 방향을 제시합니다.

                            <br/><br/>지금 바로 Community에 참여해 당신의 이야기를 들려주세요!
                        </p>
                    </div>
                    <img src="/img3.jpg" />
                </div>
                <div className="middle-three">
                    <img src="/img2.png" />
                    <div className="three-content">
                        <p>
                            <span className="highlight">"더 나은 건강을 위한 첫걸음, 맞춤형 리포트로 시작하세요!"</span>

                            <br/><br/>Wellty의 "Reports"에서 여러분의 건강한 삶의 길잡이를 찾아보세요!

                            <br/><br/>매일 쏟아지는 건강 정보 속에서 무엇이 정말 중요한지 알고 계신가요?
                            <br/>Wellty의 Reports는 신뢰할 수 있는 건강 칼럼과 전문적인 정보를 한곳에 모아, 당신의 건강을 지키고 더 나은 삶을 설계할 수 있도록 돕습니다.

                            <br/><br/>- 전문가가 엄선한 칼럼: 의학, 운동, 식단 등 다양한 분야의 전문가들이 직접 작성한 콘텐츠로 깊이 있는 정보를 제공합니다.
                            <br/>- 건강 실천 가이드: 단순한 정보 제공을 넘어, 실질적으로 실천할 수 있는 가이드와 팁을 통해 건강한 생활 습관을 만들어 갑니다. 

                            <br/><br/><span className="highlight">"지금 바로 건강한 내일을 위한 읽을거리를 만나보세요!"</span>
                            <br/><br/>Wellty의 Reports는 단순히 읽는 즐거움에서 끝나지 않습니다.
                            <br/>더 건강하고 행복한 삶을 위한 첫걸음을 시작할 수 있도록, 당신의 동반자가 되어 드리겠습니다.
                        </p>
                    </div>
                </div>
            </div>
            <div className="home-bottom-container">
                <div className="mamury">

                    Your journey to wellness starts here :)
                </div>
            </div>
        </div>
    )
}