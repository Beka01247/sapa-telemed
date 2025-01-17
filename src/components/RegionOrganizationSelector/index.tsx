import React from "react";

interface Region {
  id: number;
  region_name: string;
}

interface Organization {
  site_name: string;
  commercial_name: string;
  region_id: number;
}

const regions: Region[] = [
  { id: 1, region_name: 'АКМОЛИНСКАЯ ОБЛАСТЬ' },
  { id: 2, region_name: 'АКТЮБИНСКАЯ ОБЛАСТЬ' },
  { id: 3, region_name: 'АЛМАТИНСКАЯ ОБЛАСТЬ' },
  { id: 4, region_name: 'АТЫРАУСКАЯ ОБЛАСТЬ' },
  { id: 5, region_name: 'ЗАПАДНО-КАЗАХСТАНСКАЯ ОБЛАСТЬ' },
  { id: 6, region_name: 'ЖАМБЫЛСКАЯ ОБЛАСТЬ' },
  { id: 7, region_name: 'КАРАГАНДИНСКАЯ ОБЛАСТЬ' },
  { id: 8, region_name: 'КОСТАНАЙСКАЯ ОБЛАСТЬ' },
  { id: 9, region_name: 'КЫЗЫЛОРДИНСКАЯ ОБЛАСТЬ' },
  { id: 10, region_name: 'МАНГИСТАУСКАЯ ОБЛАСТЬ' },
  { id: 11, region_name: 'ЮЖНО-КАЗАХСТАНСКАЯ ОБЛАСТЬ' },
  { id: 12, region_name: 'ПАВЛОДАРСКАЯ ОБЛАСТЬ' },
  { id: 13, region_name: 'СЕВЕРО-КАЗАХСТАНСКАЯ ОБЛАСТЬ' },
  { id: 14, region_name: 'ВОСТОЧНО-КАЗАХСТАНСКАЯ ОБЛАСТЬ' },
  { id: 15, region_name: 'АЛМАТЫ' },
  { id: 16, region_name: 'АСТАНА' },
  { id: 17, region_name: 'ТУРКЕСТАНСКАЯ ОБЛАСТЬ' },
  { id: 18, region_name: 'ШЫМКЕНТ' },
  { id: 20, region_name: 'АБАЙСКАЯ ОБЛАСТЬ' },
  { id: 21, region_name: 'ЖЕТЫСУСКАЯ ОБЛАСТЬ' },
  { id: 22, region_name: 'УЛЫТАУСКАЯ ОБЛАСТЬ' }
];

const organizations: Organization[] = [
  { site_name: 'AKT01', commercial_name: 'ГКП "Айтекебийская РБ" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT02', commercial_name: 'ГКП "Каргалинская РБ" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT03', commercial_name: 'ГКП "Эмбинская районная больница" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT04', commercial_name: 'ГКП "Кобдинская РБ" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT05', commercial_name: 'ГКП "Иргизская РБ" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT06', commercial_name: 'ГКП "Мугалжарская РБ" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT07', commercial_name: 'ГКП "Темирская РБ" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT08', commercial_name: 'ГКП "Хромтауская РБ" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT09', commercial_name: 'ГКП "Алгинская районная больница" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT10', commercial_name: 'ГКП "Городская поликлиника №1" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT11', commercial_name: 'ГКП "Городская поликлиника №2" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT12', commercial_name: 'ГКП "Городская поликлиника №3" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT13', commercial_name: 'ГКП "Городская поликлиника №4" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT14', commercial_name: 'ГКП "Городская поликлиника №5" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT15', commercial_name: 'ГКП "Городская поликлиника №6" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT16', commercial_name: 'ГКП "Актюбинский медицинский центр" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT17', commercial_name: 'ГКП "БСМП" на ПХВ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AL01', commercial_name: 'ГКП на ПХВ "Городская многопрофильная больница города Қонаев"', region_id: 3 },
  { site_name: 'AL02', commercial_name: 'ГКП на ПХВ "Енбекшиказахская многопрофильная ЦРБ" ГУ УЗ Алматинской области', region_id: 3 },
  { site_name: 'AL03', commercial_name: 'ГКП на ПХВ "Уйгурская ЦРБ" ГУ УЗ Алматинской области', region_id: 3 },
  { site_name: 'AL04', commercial_name: 'ГКП на ПХВ "Балхашская ЦРБ"', region_id: 3 },
  { site_name: 'AL05', commercial_name: 'КГП на ПХВ "Райымбекская РБ"', region_id: 3 },
  { site_name: 'AL06', commercial_name: 'ГКП на ПХВ "Жамбылская ЦРБ"', region_id: 3 },
  { site_name: 'AL07', commercial_name: 'КГП на ПХВ "Кегенская РБ"', region_id: 3 },
  { site_name: 'ALM01', commercial_name: 'ГКП на ПХВ Городской кардиологический центр УЗ г. Алматы', region_id: 15 },
  { site_name: 'ALMGP10', commercial_name: 'КГП на ПХВ Городская поликлиника №10 УОЗ г. Алматы', region_id: 15 },
  { site_name: 'ALMGP21', commercial_name: 'КГП на ПХВ Городская поликлиника №21 УОЗ г. Алматы', region_id: 15 },
  { site_name: 'ALMGP22', commercial_name: 'КГП на ПХВ Городская поликлиника №22 УОЗ г. Алматы', region_id: 15 },
  { site_name: 'ALMGP5', commercial_name: 'КГП на ПХВ Городская поликлиника №5 УОЗ г. Алматы', region_id: 15 },
  { site_name: 'AQM01', commercial_name: 'ГКП на ПХВ Целиноградская РП при УЗ Акмолинской области', region_id: 1 },
  { site_name: 'AST01', commercial_name: 'ТОО ЦЕНТР СЕМЕЙНОГО ЗДОРОВЬЯ И СЧАСТЬЯ ОНЕГЕ', region_id: 16 },
  { site_name: 'AST02', commercial_name: 'МЦ INFINITY LIFE', region_id: 16 },
  { site_name: 'AST03', commercial_name: 'КГП Городская станция скорой медицинской помощи Астана', region_id: 7 },
  { site_name: 'AST04', commercial_name: 'ТОО Sana Vita clinic', region_id: 16 },
  { site_name: 'AST05', commercial_name: 'ТОО Olimp Medicus', region_id: 16 },
  { site_name: 'AST06', commercial_name: 'ТОО Поликлиника CITY', region_id: 16 },
  { site_name: 'ASTGB1', commercial_name: 'ГКП на ПХВ Многопрофильная городская больница №1 акимата города Астана', region_id: 16 },
  { site_name: 'ASTGB2', commercial_name: 'Многопрофильная городская больница №2', region_id: 16 },
  { site_name: 'ASTGP1', commercial_name: 'ГКП на ПХВ "Городская поликлиника №1" акимата города Астана', region_id: 16 },
  { site_name: 'ASTGP10', commercial_name: 'ГКП на ПХВ «Городская поликлиника №10» акимата города Астана', region_id: 16 },
  { site_name: 'ASTGP11', commercial_name: 'ГКП на ПХВ «Городская поликлиника №11» акимата города Астана', region_id: 16 },
  { site_name: 'ASTGP12', commercial_name: 'ГКП на ПХВ «Городская поликлиника №12» акимата города Астана', region_id: 16 },
  { site_name: 'ASTGP2', commercial_name: 'ГКП на ПХВ "Городская поликлиника №2" акимата города Астана', region_id: 16 },
  { site_name: 'ASTGP3', commercial_name: 'ГКП на ПХВ «Городская поликлиника №3» акимата города Астана', region_id: 16 },
  { site_name: 'ASTGP4', commercial_name: 'ГКП на ПХВ "Городская поликлиника № 4" акимата города Астаны', region_id: 16 },
  { site_name: 'ASTGP5', commercial_name: 'ГКП на ПХВ "Городская поликлиника №5" акимата города Астана', region_id: 16 },
  { site_name: 'ASTGP6', commercial_name: 'ГКП на ПХВ «Городская поликлиника №6» акимата города Астаны', region_id: 16 },
  { site_name: 'ASTGP8', commercial_name: 'ГКП на ПХВ «Городская поликлиника №8» акимата города Астана', region_id: 16 },
  { site_name: 'ASTGP9', commercial_name: 'ГКП на ПХВ "Городская поликлиника №9" акимата города Астана', region_id: 16 },
  { site_name: 'ASTSP', commercial_name: 'ЯТестГККП "Городская станция скорой медицинской помощи" г.Астана', region_id: 7 },
  { site_name: 'ATY01', commercial_name: 'ТОО "Салимжан и К"', region_id: 4 },
  { site_name: 'ATY02', commercial_name: 'КГП на ПХВ "Геологская поликлиника" УЗ АО', region_id: 4 },
  { site_name: 'BLP1', commercial_name: 'КГП на ПХВ "Многопрофильная больница города Балхаш" УЗКО', region_id: 7 },
  { site_name: 'BLP2', commercial_name: 'КГП "Поликлиника №2 города Балхаш" УЗКО', region_id: 7 },
  { site_name: 'BQ01', commercial_name: 'ГКП на ПХВ "Областной кожно-венерологический диспансер" УЗ акимата ЗКО', region_id: 5 },
  { site_name: 'EKBGP3', commercial_name: 'КГП на ПХВ "Поликлиника № 3 города Экибастуза"', region_id: 12 },
  { site_name: 'ERE1', commercial_name: 'ГКП на ПХВ "Ерейментауская РБ" при УЗ Акмолинской области', region_id: 1 },
  { site_name: 'JMB01', commercial_name: 'ГКП на ПХВ "Кордайская ЦРБ" Жамбылской области', region_id: 6 },
  { site_name: 'JMB02', commercial_name: 'КГП на ПХВ "ЦРБ им.Т.Рыскулова" Жамбылской области', region_id: 6 },
  { site_name: 'JMB03', commercial_name: 'ГКП на ПХВ "ЦРБ Меркенского района" Жамбылской области', region_id: 6 },
  { site_name: 'JMB04', commercial_name: 'КГП на ПХВ "ЦРБ Мойынкумского района" Жамбылской области', region_id: 6 },
  { site_name: 'JMB05', commercial_name: 'КГП на ПХВ "ЦРБ Жамбылского района" Жамбылской области', region_id: 6 },
  { site_name: 'JMB06', commercial_name: 'ГКП на ПХВ "ЦРБ Жуалынского района" Жамбылской области', region_id: 6 },
  { site_name: 'JMB07', commercial_name: 'КГП на ПХВ "ЦРБ Сарысуского района" Жамбылской области', region_id: 6 },
  { site_name: 'JMB08', commercial_name: 'КГП на ПХВ "ЦРБ Таласского района Жамбылской области"', region_id: 6 },
  { site_name: 'JMB09', commercial_name: 'ТОО "Кардиохирургическая клиника "Жүрек"', region_id: 6 },
  { site_name: 'JMB10', commercial_name: 'ГКП на ПХВ "Городская многопрофильная больница УЗАЖО"', region_id: 6 },
  { site_name: 'JMB11', commercial_name: 'КГП на ПХВ «ЦРБ Байзакского района» Жамбылской области', region_id: 6 },
  { site_name: 'JMB12', commercial_name: 'ГКП на ПХВ "Шуская ЦРБ" Жамбылской области', region_id: 6 },
  { site_name: 'JMB13', commercial_name: 'ГКП на ПХВ "Шуская ЦРБ" Жамбылской области. Поликлиника', region_id: 6 },
  { site_name: 'KRCB', commercial_name: 'КГП Центральная больница г.Каражал', region_id: 7 },
  { site_name: 'KRD16', commercial_name: 'КГП "Областная клиническая больница" УЗ КО', region_id: 7 },
  { site_name: 'KRG01', commercial_name: 'КГП "Многопрофильная больница №2 города Караганды" УЗ КО', region_id: 7 },
  { site_name: 'KRG02', commercial_name: 'КГП на ПХВ " Больница города Приозерск" УЗКО', region_id: 7 },
  { site_name: 'KRG03', commercial_name: 'КГП "Центральная районная больница Абайского района" УЗКО', region_id: 7 },
  { site_name: 'KRG04', commercial_name: 'КГП "Центральная районная больница Актогайского района" УЗКО', region_id: 7 },
  { site_name: 'KRG05', commercial_name: 'КГП "Центральная районная больница Бухар-Жырауского района" УЗКО', region_id: 7 },
  { site_name: 'KRG06', commercial_name: 'КГП "ЦРБ Жанааркинского района, п.Атасу" - Кар.обл', region_id: 7 },
  { site_name: 'KRG07', commercial_name: 'КГП на ПХВ "Районная больница Каркаралинского района" УЗКО', region_id: 7 },
  { site_name: 'KRG08', commercial_name: 'КГП "ЦРБ Нуринского района, п.Киевка" - Кар.обл.', region_id: 7 },
  { site_name: 'KRG10', commercial_name: 'КГП "Центральная районная больница Осакаровского района" УЗКО', region_id: 7 },
  { site_name: 'KRG11', commercial_name: 'КГП "Центральная районная больница Шетского района" УЗКО', region_id: 7 },
  { site_name: 'KRG12', commercial_name: 'КГП "ЦРБ Шетского района, п.Аксу-Аюлы" - Кар.обл.', region_id: 7 },
  { site_name: 'KRG13', commercial_name: 'КГП "Центральная районная больница Улытауского района" УЗКО', region_id: 22 },
  { site_name: 'KRG14', commercial_name: 'КГП на ПХВ  "Больница города Каражал" УЗ области Ұлытау', region_id: 22 },
  { site_name: 'KRG15', commercial_name: 'КГП "Больница п.Жайрем" - Кар.обл', region_id: 7 },
  { site_name: 'KRG17', commercial_name: 'Городская поликлиника №1 г.Караганда', region_id: 7 },
  { site_name: 'KRG18', commercial_name: 'КГП "ЦБ г.Абай" - Кар.обл.', region_id: 7 },
  { site_name: 'KRG19', commercial_name: 'КГП "Центральная районная больница Нуринского района" УЗКО', region_id: 7 },
  { site_name: 'KRG20', commercial_name: 'КГП ЦРБ Осакаровского р-на Кар.обл.', region_id: 7 },
  { site_name: 'KRG21', commercial_name: 'КГП «Центральная больница города Абая»', region_id: 7 },
  { site_name: 'KRG22', commercial_name: 'КГП "ЦЕНТРАЛЬНАЯ БОЛЬНИЦА ГОРОДА БАЛХАШ"', region_id: 7 },
  { site_name: 'KRG23', commercial_name: 'КГП «Центральная больница города Темиртау» УЗКО', region_id: 7 },
  { site_name: 'KRG24', commercial_name: 'КГП ЦБ Сарани', region_id: 7 },
  { site_name: 'KRG25', commercial_name: 'ТОО "InLife"', region_id: 7 },
  { site_name: 'KRG26', commercial_name: 'КГП "Поликлиника №3 города Караганды" УЗКО', region_id: 7 },
  { site_name: 'KRG27', commercial_name: 'КГУ "ЦЕНТР ОКАЗАНИЯ СПЕЦИАЛЬНЫХ СОЦИАЛЬНЫХ УСЛУГ "АКТИВНОЕ ДОЛГОЛЕТИЕ"', region_id: 7 },
  { site_name: 'KRG28', commercial_name: 'ТОО "Shipager Med"', region_id: 7 },
  { site_name: 'KRG29', commercial_name: 'ТОО "Детская поликлиника 1"', region_id: 7 },
  { site_name: 'KRG30', commercial_name: 'КГП на ПХВ "Многопрофильная больница №3 города Караганды" УЗКО', region_id: 7 },
  { site_name: 'KRG31', commercial_name: 'КГП на ПХВ "Многопрофильная больница имени профессора Х.Ж. Макажанова" УЗ КО', region_id: 7 },
  { site_name: 'KRG32', commercial_name: 'ТОО "МЦ Жезказган" г.Балхаш', region_id: 7 },
  { site_name: 'KRG33', commercial_name: 'КГП на ПХВ "Больница города Абая" УЗКО', region_id: 7 },
  { site_name: 'KRG99', commercial_name: 'Дистанционно-консультационный центр г.Караганды', region_id: 7 },
  { site_name: 'KRGAGSP', commercial_name: 'СМП "СБ Шетского р-на, п.Агадыр"', region_id: 7 },
  { site_name: 'KRGDP01', commercial_name: 'Детская поликлиника №1', region_id: 7 },
  { site_name: 'KRGGIP', commercial_name: 'ТОО "Медицинская фирма "Гиппократ"', region_id: 7 },
  { site_name: 'KRGOKC', commercial_name: 'ЯТест«Областной кардиохирургический центр» г.Караганда', region_id: 7 },
  { site_name: 'KRGP011', commercial_name: 'ТОО "Новая Поликлиника"', region_id: 7 },
  { site_name: 'KRGP1', commercial_name: 'КГП "Поликлиника №1 города Караганды" УЗКО', region_id: 7 },
  { site_name: 'KRGP11', commercial_name: 'КГП "Многопрофильная больница №1 г. Караганды" УЗКО', region_id: 7 },
  { site_name: 'KRGSP', commercial_name: 'Областная станция СМП Караганда', region_id: 7 },
  { site_name: 'KRZHSP', commercial_name: 'Скорая помощь г. Каражал', region_id: 7 },
  { site_name: 'KZ001', commercial_name: 'ТОО "СапаТелемед"', region_id: 16 },
  { site_name: 'MAN01', commercial_name: 'ГКП на ПХВ "Каракиянская центральная районная больница"', region_id: 10 },
  { site_name: 'NNMC', commercial_name: 'ННМЦ Астана', region_id: 16 },
  { site_name: 'OK1', commercial_name: 'ГКП на ПХВ "Областной кардиологический центр" УЗ ЮКО', region_id: 17 },
  { site_name: 'OKSAR', commercial_name: 'Тест - Сарыагашская ЦРБ', region_id: 17 },
  { site_name: 'PRZSP', commercial_name: 'СМП «ЦБ г.Приозерск» - Кар.обл.', region_id: 7 },
  { site_name: 'PVD01', commercial_name: 'КГП на ПХВ "Павлодарский областной кардиологический центр"', region_id: 12 },
  { site_name: 'PVD02', commercial_name: 'КГКП "Павлодарский областной центр фтизиопульмонологии"', region_id: 12 },
  { site_name: 'PVD03', commercial_name: 'КГП на ПХВ "Поликлиника Павлодарского района"', region_id: 12 },
  { site_name: 'PVD04', commercial_name: 'КГП на ПХВ "Щербактинская РБ"', region_id: 12 },
  { site_name: 'PVD1', commercial_name: 'Областной центр по профилактике и борьбе со СПИД Павлорадской Области', region_id: 12 },
  { site_name: 'PVDGP3', commercial_name: 'КГП на ПХВ "Поликлиника № 3 города Павлодара"', region_id: 12 },
  { site_name: 'QST01', commercial_name: 'КГП "Костанайская РБ" УЗ АКО', region_id: 8 },
  { site_name: 'QZL01', commercial_name: 'КГП на ПХВ "Шиелийская многопрофильная ЦРБ" УЗ Кызылординской области', region_id: 9 },
  { site_name: 'SAT01', commercial_name: 'ТОО "СД Туран"', region_id: 22 },
  { site_name: 'SATCB', commercial_name: 'КГП "Центральная больница №1 г.Сатпаев" УЗКО', region_id: 22 },
  { site_name: 'SATCP', commercial_name: 'КГП "Поликлиника города Сатпаев" УЗКО', region_id: 7 },
  { site_name: 'SEM01', commercial_name: 'КГП на ПХВ "Поликлиника №2 г. Семей" УЗ ОА', region_id: 20 },
  { site_name: 'SEMSP', commercial_name: '"Станция скорой медицинской помощи" г. Семей', region_id: 14 },
  { site_name: 'SK02', commercial_name: 'КГП на ПХВ "Районная больница района Магжана Жумабаева" КГУ "УЗ акимата СКО"', region_id: 13 },
  { site_name: 'SKO03', commercial_name: 'КГП "Тайыншинская ЦРБ" - СКО', region_id: 13 },
  { site_name: 'SPD01', commercial_name: 'Городской центр по профилактике и борьбе со СПИД г.Нур-Султан', region_id: 16 },
  { site_name: 'SPD02', commercial_name: 'ГКП на ПХВ "Акмолинский областной центр по профилактике и борьбе со СПИД"', region_id: 1 },
  { site_name: 'SPD03', commercial_name: 'КГП "Областной центр по профилактике и борьбе со СПИД" УЗКО', region_id: 7 },
  { site_name: 'SPD04', commercial_name: 'Областной центр по профилактике и борьбе со СПИД ВКО', region_id: 14 },
  { site_name: 'SPD05', commercial_name: 'Городской центр по профилактике и борьбе со СПИД г.Семей', region_id: 20 },
  { site_name: 'SPD06', commercial_name: 'Областной центр по профилактике и борьбе со СПИД Жамбылской Области', region_id: 6 },
  { site_name: 'SPD07', commercial_name: 'Областной центр по профилактике и борьбе со СПИД Костанайской Области', region_id: 8 },
  { site_name: 'SPD08', commercial_name: 'ГККП "Центр по профилактике и борьбе со СПИД" УЗ г.Шымкент', region_id: 18 },
  { site_name: 'TEM01', commercial_name: 'КГП на ПХВ "Многопрофильная больница города Темиртау" УЗКО', region_id: 7 },
  { site_name: 'TEM01SP', commercial_name: 'КГП «Поликлиника №1 города Темиртау» УЗКО', region_id: 7 },
  { site_name: 'TEM02', commercial_name: 'КГП "Многопрофильный центр матери и ребенка города Темиртау" УЗКО', region_id: 7 },
  { site_name: 'TEM04', commercial_name: 'КГП «Поликлиника № 4 города Темиртау» УЗКО', region_id: 7 },
  { site_name: 'TEM05', commercial_name: 'Производственная база г. Темиртау ТОО "Новая Поликлиника"', region_id: 7 },
  { site_name: 'TEMAR', commercial_name: 'Арселор Миттал', region_id: 7 },
  { site_name: 'TEMCB', commercial_name: 'Центральная больница Темиртау', region_id: 7 },
  { site_name: 'TEMSP', commercial_name: 'КГП "Станция скорой медицинской помощи г. Темиртау"', region_id: 7 },
  { site_name: 'TKD', commercial_name: 'ЯТестДемо', region_id: 7 },
  { site_name: 'TUR1', commercial_name: 'ГКП на ПХВ "Сарыагашская центральная районная больница" УОЗ ТО', region_id: 17 },
  { site_name: 'TUR2', commercial_name: 'ГКП на ПХВ "Жетысайская районная больница "Асык-Ата" УОЗ ТО', region_id: 17 },
  { site_name: 'UDP', commercial_name: 'Больница Медицинского Центра УДП РК', region_id: 16 },
  { site_name: 'ULT01', commercial_name: 'ТОО "МЦ Жезказган" (Область Ұлытау)', region_id: 22 },
  { site_name: 'VKO01', commercial_name: 'КазЦинк', region_id: 14 },
  { site_name: 'ZH01', commercial_name: 'Поликлиника г.Жезказган', region_id: 7 },
  { site_name: 'ZHAB', commercial_name: 'ТОО "Абильдинова", г. Жезказган', region_id: 22 },
  { site_name: 'ZHAT', commercial_name: 'ТОО "Ахметова", г. Сатпаев', region_id: 22 },
  { site_name: 'ZHBM', commercial_name: 'ТОО "ЖезДенсаулық"', region_id: 22 },
  { site_name: 'ZHBS', commercial_name: 'ТОО "Бексеитова" г. Жезказган', region_id: 22 },
  { site_name: 'ZHCB', commercial_name: 'КГП "Поликлиника г. Жезказган" УЗКО', region_id: 22 },
  { site_name: 'ZHKB', commercial_name: 'ТОО "Кошумбаева", г. Жезказган', region_id: 22 },
  { site_name: 'ZHLK', commercial_name: 'ТОО "Лекерова", г.Сатпаев', region_id: 22 },
  { site_name: 'ZHMK', commercial_name: 'ТОО "Макенбаева", г. Жезказган', region_id: 22 },
  { site_name: 'ZHRSP', commercial_name: 'Скорая помощь п.Жайрем', region_id: 22 },
  { site_name: 'ZHSP', commercial_name: 'Скорая помощь г. Жезказган', region_id: 22 },
  { site_name: 'ZHTN', commercial_name: 'ТОО"Тильман", г. Жезказган', region_id: 22 },
  { site_name: 'ZHZH', commercial_name: 'ТОО "Журек", г. Жезказган', region_id: 22 }
];


interface RegionOrganizationSelectorProps {
  region: number | null;
  setRegion: (region: number | null) => void;
  organization: string;
  setOrganization: (organization: string) => void;
}

const RegionOrganizationSelector: React.FC<RegionOrganizationSelectorProps> = ({
  region,
  setRegion,
  organization,
  setOrganization,
}) => {
  const filteredOrganizations = organizations.filter(
    (org) => org.region_id === region
  );

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = parseInt(e.target.value, 10);
    setRegion(regionId);
    setOrganization(""); // Reset organization when the region changes
  };

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrganization(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="region">Выберите регион: </label>
        <select
          id="region"
          value={region || ""}
          onChange={handleRegionChange}
        >
          <option value="" disabled>
            -- Выберите регион --
          </option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.region_name}
            </option>
          ))}
        </select>
      </div>
      <br />
      {region && (
        <div>
          <label htmlFor="organization">Выберите организацию: </label>
          <select
            id="organization"
            value={organization}
            onChange={handleOrganizationChange}
          >
            <option value="" disabled>
              -- Выберите организацию --
            </option>
            {filteredOrganizations.map((org) => (
              <option key={org.site_name} value={org.site_name}>
                {org.commercial_name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default RegionOrganizationSelector;
