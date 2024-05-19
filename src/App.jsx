import styled from "styled-components";
import "./index.css";
import arrow from "./assets/download.svg";
import britanFlag from "./assets/britan.png";
import georgianFlag from "./assets/georgian.png";
import { useState } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import georgian from "./locales/geo.json";
import english from "./locales/eng.json";

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      geo: {
        translation: georgian.translation,
      },
      eng: {
        translation: english.translation,
      },
    },
    geo: "geo",
    eng: "eng",
    fallbackLng: "eng",
    interpolation: {
      escapeValue: false,
    },
  });
function App() {
  const { t } = useTranslation();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [dateDifference, setDateDifference] = useState({
    years: "--",
    months: "--",
    days: "--",
  });
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    let specifiedYear = parseInt(year, 10);
    const specifiedMonth = parseInt(month, 10) - 1;
    const specifiedDay = parseInt(day, 10);

    const specifiedDate = new Date(specifiedYear, specifiedMonth, specifiedDay);

    let yearsDiff = currentDate.getFullYear() - specifiedDate.getFullYear();
    let monthsDiff = currentDate.getMonth() - specifiedDate.getMonth();
    let daysDiff = currentDate.getDate() - specifiedDate.getDate();

    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      yearsDiff -= 1;
    }

    if (monthsDiff < 0) {
      monthsDiff = 12 + monthsDiff;
    }

    if (daysDiff < 0) {
      const prevMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        specifiedDate.getDate()
      );
      const diff = Math.ceil(
        (currentDate.getTime() - prevMonthDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      monthsDiff -= 1;
      daysDiff = diff;
    }

    setDateDifference({
      years: yearsDiff,
      months: monthsDiff,
      days: daysDiff,
    });
  };

  return (
    <Container>
      <ContentSection>
        <Welcome>{t("Welcome")}</Welcome>

        <div className="container">
          <div onClick={() => handleLanguageChange("eng")}>
            <img src={britanFlag} alt="" />
          </div>
          <div onClick={() => handleLanguageChange("geo")}>
            <img src={georgianFlag} alt="" />
          </div>
        </div>
        <Content>
          <Form onSubmit={handleSubmit}>
            <FormFlex>
              <FormDiv>
                <Label htmlFor="day">{t("day").toUpperCase()}</Label>
                <Input
                  type="text"
                  name="day"
                  id="day"
                  placeholder="DD"
                  value={day}
                  onChange={handleDayChange}
                />
              </FormDiv>
              <FormDiv>
                <Label htmlFor="month">{t("month").toUpperCase()}</Label>
                <Input
                  type="text"
                  name="month"
                  id="month"
                  placeholder="MM"
                  value={month}
                  onChange={handleMonthChange}
                />
              </FormDiv>
              <FormDiv>
                <Label htmlFor="year">{t("year").toUpperCase()}</Label>
                <Input
                  type="text"
                  name="year"
                  id="year"
                  placeholder="YYYY"
                  value={year}
                  onChange={handleYearChange}
                />
              </FormDiv>
            </FormFlex>

            <StickSection>
              <Stick />
              <Arrow className="kd" type="submit">
                <Image src={arrow} alt="arrow icon" />
              </Arrow>
            </StickSection>
          </Form>
          <YearMonthDayDivSection>
            <YearMonthDayDiv>
              <DashDash>{dateDifference.years}</DashDash>
              <H1>{t("year")}</H1>
            </YearMonthDayDiv>
            <YearMonthDayDiv>
              <DashDash>{dateDifference.months}</DashDash>
              <H1>{t("month")}</H1>
            </YearMonthDayDiv>
            <YearMonthDayDiv>
              <DashDash>{dateDifference.days}</DashDash>
              <H1>{t("day")}</H1>
            </YearMonthDayDiv>
          </YearMonthDayDivSection>
        </Content>
      </ContentSection>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: #f0f0f0;
`;

const ContentSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const Welcome = styled.h1`
  padding-bottom: 20px;
`;
const Content = styled.div`
  border-bottom-right-radius: 150px;
  width: 40%;
  height: 467px;
  background-color: hsl(0 0% 100% / 1);
  border-color: hsl(0 0% 100% / 1);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 1.25rem;
  padding-top: 40px;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const FormFlex = styled.div`
  display: flex;
`;

const FormDiv = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
`;

const Label = styled.label`
  color: hsl(0 1% 44% / 1);
  letter-spacing: 0.1em;
  font-weight: 800;
  font-size: 1rem;
  line-height: 1rem;
`;

const Input = styled.input`
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: #000000;
  font-weight: 800;
  padding-left: 0.75rem;
  padding-right: 0.25rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  border-width: 1px;
  border-radius: 0.375rem;
  width: 66.666667%;
  height: 2rem;
  border: 1px solid hsl(0 0% 86% / 1);
  outline-color: #854cff;
`;
const StickSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Stick = styled.div`
  width: 88%;
  height: 1px;
  background-color: hsl(0 0% 86% / 1);
`;

const Arrow = styled.button`
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #854cff;
  transition: background-color 0.3s;
  outline: none;
  border: 0;
`;
const Image = styled.img`
  width: 32px;
  height: 30px;
  object-fit: contain;
`;
const YearMonthDayDivSection = styled.div`
  display: grid;
  justify-content: start;
  width: 100%;
`;
const YearMonthDayDiv = styled.div`
  display: flex;
  gap: 10px;
`;
const DashDash = styled.div`
  color: hsl(259 100% 65% / 1);
  font-size: 70px;
  line-height: 1;
  font-style: italic;
  font-weight: 800;
  display: flex;
  align-items: center;
`;
const H1 = styled.div`
  color: black;
  font-size: 70px;
  line-height: 1;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-style: italic;
  font-weight: 800;
  display: flex;
  align-items: center;
`;
