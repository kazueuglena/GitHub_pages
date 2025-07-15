import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- 多言語コンテンツ ---
const content = {
    ja: {
        nav: { profile: "Profile", vision: "Vision", news: "News", research: "Research", projects: "Projects", map: "Map", activities: "Activities", contact: "Contact" },
        hero: { title: "Kazuhiro Komatsu", subtitle: "植物の知性に挑む高校生研究者" },
        profile: {
            title: "Profile",
            name: "小松 和滉 (Kazuhiro Komatsu)",
            affiliation: "長野県諏訪清陵高等学校 | 次世代研究所 ADvance Lab 副所長",
            description: "「植物の持つ能力を知りたい」という思いを原点に、オジギソウの刺激馴化メカニズムの解明に挑んでいます。深層学習や自作デバイスを駆使した研究の傍ら、科学の面白さを次世代に伝える教育活動にも情熱を注いでいます。",
            cv_button: "CVを見る"
        },
        vision: {
            title: "Vision",
            heading: "Flourish with Flora",
            subheading: "Redesign the world with the OS of life",
            description: "植物が持つ、まだ見ぬ能力を解き明かし、社会に応用すること。植物は、私たちが思っている以上に賢く、素晴らしい生存戦略や仲間とのコミュニケーション術を持っています。例えば、光や栄養を見つける能力、害虫から身を守る能力、そして環境の変化に器用に対応する能力などです。私は、こうした植物の隠された知性を深く理解し、最先端のテクノロジーと組み合わせることで、さまざまな分野で大きな変化を起こせると強く信じています。",
        },
        news: {
            title: "News",
            items: [
                { date: "2025-07-15", title: "ポートフォリオサイトを大幅リニューアル！", summary: "インタラクティブな機能を追加し、ウェブサイトを全面的に更新しました。", fullContent: "本日、ポートフォリオサイトを大幅にリニューアルしました。これまでの活動内容の拡充に加え、新たにNewsセクション、インタラクティブな活動マップなどを追加しました。これにより、私の活動の現在・過去・未来をより深く、そして楽しく知っていただけるようになったと信じています。ぜひサイト内を探索してみてください。<br><br><a href='https://sites.google.com/view/kazuhirokomatsu' target='_blank' rel='noopener noreferrer' class='text-emerald-600 hover:underline'>以前のサイトはこちら</a>", images: [`${process.env.PUBLIC_URL}/images_news/new_website.png`, `${process.env.PUBLIC_URL}/images_news/new_website2.png`, `${process.env.PUBLIC_URL}/images_news/new_website3.png`] },
                { date: "2025-07-11", title: "ACMB-JSMB2025にてポスター発表を行いました", summary: "ACMB-JSMB2025にて、植物の刺激馴化メカニズムに関する研究成果をポスター発表しました。", fullContent: "ACMB-JSMB2025（Asian Conference on Mathematical Biology と Annual Meeting of Japanese Society for Mathematical Biology の合同会議）にて、私の研究テーマであるオジギソウの刺激馴化メカニズムに関するポスター発表を行いました。この合同会議は、数理生物学の分野におけるアジア地域および日本の最先端の研究が一堂に会する重要な学術イベントです。\n発表では、植物が環境刺激にどのように適応し、その応答を変化させるのかというメカニズムについて、数理的なアプローチやモデル構築を通じて得られた新たな知見を共有しました。特に、オジギソウの「記憶」とも言える刺激馴化現象を、数理モデルを用いて解析した成果について、参加された研究者の方々と活発な議論を行うことができ、非常に有意義な時間となりました。", images: [`${process.env.PUBLIC_URL}/images_news/ACMBJSMB1.jpg`, `${process.env.PUBLIC_URL}/images_news/ACMBJSMB2.jpg`] },
            ],
            view_more_button: "VIEW ALL",
            details_button: "詳細を見る"
        },
        research: {
            title: "Research & Awards",
            description: "これまでの研究活動関連の主な受賞や研究費採択",
            awards: [
                { year: "2024", title: "サイエンスキャッスル研究費", prize: "THK賞", details: "「植物フェノタイピングによる自動かつ高精度なオジギソウの開閉度の定量化と振動装置の開発」という研究テーマで採択。研究の基盤となる実験装置開発への支援を受けました。" },
                { year: "2024", title: "サイエンスキャッスル研究費", prize: "価値共創賞 (ダイセル)", details: "「オジギソウの刺激に対する記憶能のメカニズムの化学的解明」という研究テーマで採択。化学的なアプローチによる研究の発展が期待されています。" },
                { year: "2023", title: "第1回 学びの協奏コンテスト", prize: "山極寿一賞", details: "オジギソウの概日リズムに関する研究の成果と、その研究プロセスにおける学びの深さが評価され、初代受賞者の一人となりました。" },
                { year: "2022 & 2023", title: "長野県学生科学賞", prize: "県知事賞", details: "オジギソウの就眠運動に関する研究（2022年）（2023年）で、2年連続で最高の賞である県知事賞を受賞しました。どちらの研究も長野県の代表として中央審査に推薦されました。" },
                { year: "2023", title: "サイエンスキャッスル関東大会", prize: "日本ハム賞", details: "「深層学習を用いたオジギソウの開閉状況の定量化による就眠運動の解明と制御」というテーマでの口頭発表が高く評価され、受賞に至りました。研究の独創性とプレゼンテーション能力が認められました。" },
            ],
            publications_title: "Materials",
            download_button: "資料をダウンロード",
            publications: [
                { title: "The Evolutionary and Ecological Significance of Stimulus-Specific Habituation in Mimosa pudica L. A Mathematical Modeling Approach", journal: "ACMB-JSMB2025", year: 2025, pdf: `${process.env.PUBLIC_URL}/materials/poster-acmb-jsmb2025.pdf`, type: "ポスター発表", details: "オジギソウの刺激馴化が持つ進化生態学的な意義を、数理モデルを用いて評価しました。特に、馴化がエネルギー消費削減に効果的な適応戦略であること、そして刺激誤認識のリスクが高い状況下で最適な防御戦略となることを、モデルの妥当性を検証しつつ示しました。"},
                { title: "オジギソウ (Mimosa Pudica L.) における刺激特異的馴化の進化生態学的意義: 数理モデルを用いた解析", journal: "N高校研究部紀要2025", year: 2025, pdf: `${process.env.PUBLIC_URL}/materials/paper-n-high-2025.pdf`, type: "紀要", details: "オジギソウの刺激馴化がエネルギー効率を高め、生存に不可欠であることを数理モデルで定量的に解析しました。不要な応答コストを抑制し、長期的なエネルギー蓄積に貢献する馴化の適応的意義を明らかにしています。" },
                { title: "オジギソウの刺激に対する順応機構の生理学的研究", journal: "日本植物生理学会2025", year: 2025, pdf: "", type: "ポスター発表", details: "オジギソウの刺激馴化メカニズムを、訓練による順応検証、内部構造観察、イオンチャネル解析を通じて生理学的に解明。エネルギー節約に寄与する選択的認識メカニズムを探求します。" },
                { title: "深層学習を用いたミドリムシの動き方の定量化によるステップアップ・ダウン光驚動反応の解明", journal: "サイエンスキャッスル関東大会", year: 2023, pdf: `${process.env.PUBLIC_URL}/materials/poster-euglena-2023.pdf`, type: "ポスター発表", details: "オジギソウ研究の原点となった、単細胞生物ユーグレナの光に対する行動と体内時計の関係性を探った初期の研究成果です。" }
            ]
        },
        projects: {
            title: "Ongoing & Main Projects",
            view_all_button: "VIEW ALL",
            items: [
                { image: `${process.env.PUBLIC_URL}/images/mimosa_hab.jpg`, title: "オジギソウの刺激特異的馴化機構の解明", description: "オジギソウの刺激に対する順応能力（慣れ）を独自開発した期間度定量化技術と全方位刺激装置により研究しています。", period: "24年3月~継続中", details: "オジギソウが特定の刺激に対して「慣れる」現象、すなわち刺激馴化のメカニズム解明を目指しています。独自に開発した全方位刺激装置と、深層学習を用いた画像解析技術を組み合わせることで、刺激の方向や強度と馴化の関係性を定量的に評価します。将来的には、この能力がどのようなメカニズムで維持されているのかを明らかにします。" },
                { image: `${process.env.PUBLIC_URL}/images/mimosa.jpg`, title: "オジギソウの就眠運動（概日リズム）", description: "オジギソウの概日リズムをその一つの出力系である就眠運動を観察することで研究しています。", period: "21年4月~24年2月", details: "植物が持つ体内時計（概日リズム）の出力の一つとして、夜間に葉を閉じる「就眠運動」に着目。深層学習を用いて24時間体制で葉の開閉度を自動定量化するシステムを構築しました。これにより、オジギソウが日没を予測して葉を閉じ始める行動や、光強度に応じて開度を微調整する様子を明らかにしました。" },
                { image: `${process.env.PUBLIC_URL}/images/science.png`, title: "サイエンス出前便", description: "地方と都市部の教育格差を是正し、子供たちが科学に触れ合う機会を増やすため科学教室を企画しています。", period: "24年11月~継続中", details: "自身の経験から地方における科学教育の機会格差に問題意識を持ち、立ち上げたプロジェクトです。長野県内の小学生を対象に、身近な自然をテーマにした科学教室を企画・運営。観察や実験を通じて、子どもたちの知的好奇心を引き出し、科学の面白さを伝える活動を継続的に行っています。" },
                { image: `${process.env.PUBLIC_URL}/images/hydra.png`, title: "ヒドラにおける古典的条件付けの解明", description: "単純な散在神経系を持つHydra vulgarisにおいて、学習の一種である古典的条件付けが存在するのかを検証しています", period: "25年4月~継続中", details: "本研究は、脳を持たないヒドラ（Hydra vulgaris）が連合学習（古典的条件付け）を示すかを検証します。採食行動を引き起こす還元型グルタチオン（無条件刺激）と、体収縮を誘発する青色光（条件刺激）を繰り返し対提示し、その後、青色光のみで採食行動が誘発されるかをAIを用いた行動解析により評価します。これにより、学習能力の進化的起源に迫り、ヒドラの神経科学における新たなモデル生物としての可能性を探ります。" }
            ]
        },
        map: {
            title: "Global Activity Map",
            description: "これまでの活動・留学先を地図にプロットしています。（クリックで詳細が表示されます。）",
            locations: [
                { id: "san-francisco", name: "米国 サンフランシスコ", image: `${process.env.PUBLIC_URL}/images/san.jpg`, details: "「ながの視察団 AOKI咸臨丸」の一員として訪問。1週間の滞在期間中、ベンチャーキャピタルや元駐日大使との面談など、貴重な経験を積みました。" },
                { id: "utah", name: "米国 ユタ州", image: `${process.env.PUBLIC_URL}/images/utah.png`, details: "小学5年生の時、1ヶ月間のホームステイを経験。初めての海外で大きなカルチャーショックを受け、国際的な視野を広げるきっかけとなりました。" },
                { id: "shanghai", name: "中国 上海", image: `${process.env.PUBLIC_URL}/images/shanghai.jpg`, details: "中学3年生の時、2週間の学校寮滞在を経験。現地の有名観光地を訪れると共に、学校の授業に参加し、文化交流を深めました。" },
                { id: "singapore", name: "シンガポール", image: `${process.env.PUBLIC_URL}/images/singapore.png`, details: "中学3年生の時、2週間のホームステイを経験。ムスリムのホストファミリーとの交流を通じて、文化的な違いを乗り越え、互いの理解を深めました。" }
            ]
        },
        activities: {
            title: "Activities & Involvements",
            site_button: "公式サイト",
            items: [
                { image: `${process.env.PUBLIC_URL}/images/SPICE_entre.png`, year: "2024-2025", title: "Stanford e-Entrepreneurship", event: "日本中から集まった高校生と英語で講義を受け、教育や健康分野に関して共同でプレゼンテーションを行った。", details: "スタンフォード大学の講師陣によるオンライン講義を通じて、起業家精神やビジネスプランニングの基礎を学びました。最終的には、教育格差問題に取り組むためのプロジェクトをチームで立案し、英語で発表しました。", link: "https://spice.fsi.stanford.edu/fellowship/stanford-e-entrepreneurship-japan" },
                { image: `${process.env.PUBLIC_URL}/images/SPICE.png`, year: "2025", title: "Stanford e-Japan", event: "日本中から集まった高校生と英語でStanford大学の教員から日米同盟などに関して教育を受け、英語でディスカッションをした。", details: "日米関係の専門家による講義を受け、外交、文化、経済など多角的な視点から日米関係について学びました。他の参加者との英語でのディスカッションを通じて、国際的な視野と議論のスキルを深めました。", link: "https://spice.fsi.stanford.edu/fellowship/stanford-e-japan" },
                { image: `${process.env.PUBLIC_URL}/images/n1.png`, year: "2024-2025", title: "エヌイチ道場 5期生", event: "科学教育プログラムに関して、ビジョンにつながる想いの深堀から、顧客開拓、事業計画立案などを行ったほか、起業家精神を学んだ。", details: "自身の「サイエンス出前便」プロジェクトを事業として発展させるため、メンターの指導のもと、事業計画の策定、ターゲット顧客の分析、収益モデルの検討など、実践的な起業プロセスを学びました。", link: "https://www.sunaba.org/n1dojo" },
                { image: `${process.env.PUBLIC_URL}/images/UTokyo.jpg`, year: "2024-", title: "UTokyoGSC-NEXT 6期生", event: "東京大学生産技術研究所が主催するSTEAM教育プログラム。全国から集まった高校生とともに、東大の先生方の講義を受けディスカッションを行った。", details: "東京大学の教授陣から最先端の科学技術に関する講義を受け、自身の研究テーマを深める機会を得ました。全国から集まった意欲の高い同世代の仲間と交流し、大きな刺激を受けています。", link: "https://gsc.iis.u-tokyo.ac.jp/" },
                { image: `${process.env.PUBLIC_URL}/images/advancelab.png`, year: "2024-", title: "ADvance Lab 1期生", event: "次世代のための次世代による研究所であるADvance Labのメンバーとして、企画検討や企業訪問、また研究を行った。", details: "現在は副所長として、ラボの運営にも関わっています。次世代と企業をつなぎ新たな価値を創造するとともに、地方におけるイベントなども企画し研究の輪を広げています。", link: "https://adlab.lne.st/" },
                { image: `${process.env.PUBLIC_URL}/images/aoki.png`, year: "2022-2023", title: "ながの視察団 AOKI咸臨丸 7期生", event: "AOKI財団が主催する中学生を対象にしたリーダーシップ研修プログラムに参加しました。毎月のリーダーシップに関する講義や2度の国内研修、シリコンバレーにおける起業家プログラムなどを通し、リーダーシップやFail Firstの精神を学びました。", details: "中学生の時に参加したこのプログラムが、現在の活動の原点の一つです。シリコンバレーでの研修では、失敗を恐れずに挑戦する文化に触れ、自身の行動指針に大きな影響を受けました。", link: "https://aoki-zaidan.or.jp/srv_kanrin.php" },
                { image: `${process.env.PUBLIC_URL}/images/Tsukuba.png`, year: "2021-2022", title: "つくばSKIPアカデミー", event: "筑波大学の数理陣の授業をオンラインで受け、科学的素養を磨いた。また、そのつながりで研究室を訪問した。", details: "オンラインで大学レベルの数学や物理学に触れることで、科学研究に必要な論理的思考の基礎を固めました。この時の経験が、現在の研究で数理モデルを扱う上での助けとなっています。", link: "https://skip.tsukuba.ac.jp/" }
            ]
        },
        contact: {
            title: "Get In Touch",
            description: "研究や活動に興味をお持ちいただけましたら、お気軽にご連絡ください。\n共同研究などのご相談も歓迎いたします。",
            email: "koma1667@outlook.jp"
        },
        footer: {
            columns: [
                { title: "Explore", items: ["Profile", "Vision", "News", "Research", "Projects", "Map", "Former Site"] },
                { title: "Activities", items: ["Activities", "ADvance Lab"] },
                { title: "Connect", items: ["Contact", "X (Twitter)", "Instagram", "Facebook", "LinkedIn"] }
            ]
        },
        all_news_page: {
            title: "すべてのニュース",
            back_button: "メインページに戻る"
        },
        all_projects_page: {
            title: "すべてのプロジェクト",
            back_button: "メインページに戻る"
        }
    },
    en: {
        nav: { profile: "Profile", vision: "Vision", news: "News", research: "Research", projects: "Projects", map: "Map", activities: "Activities", contact: "Contact" },
        hero: { title: "Kazuhiro Komatsu", subtitle: "A High School Student Exploring Plant Intelligence." },
        profile: {
            title: "Profile",
            name: "Kazuhiro Komatsu",
            affiliation: "Suwa Seiryo High School | Vice Director, ADvance Lab",
            description: "Driven by a desire to understand the abilities of plants, I am tackling the challenge of elucidating the stimulus habituation mechanism in the sensitive plant, Mimosa pudica. While conducting research using deep learning and custom-built devices, I am also passionate about educational activities that convey the wonders of science to the next generation.",
            cv_button: "View CV"
        },
        vision: {
            title: "Vision",
            heading: "Flourish with Flora",
            subheading: "Redesign the world with the OS of life",
            description: "My research focuses on deciphering the unseen operating system of plants and applying it to society. By understanding their ingenious survival strategies and communication abilities, I believe we can innovate in various fields, from agriculture and environmental issues to our well-being. My ultimate goal is to build a more sustainable and prosperous society where plants and people coexist seamlessly as partners.",
        },
        news: {
            title: "News",
            items: [
                { date: "2025-07-15", title: "Major Portfolio Site Renewal!", summary: "The website has been completely updated with new interactive features.", fullContent: "Today, I've launched a major renewal of my portfolio site. In addition to expanding on my past activities, I've added a new News section and an interactive activity map. I believe this will allow visitors to gain a deeper and more enjoyable understanding of the past, present, and future of my work. Please explore the site.<br><br>The previous version of the site can be viewed <a href='https://sites.google.com/view/kazuhirokomatsu' target='_blank' rel='noopener noreferrer' class='text-emerald-600 hover:underline'>here</a>.", images: [`${process.env.PUBLIC_URL}/images_news/new_website.png`, `${process.env.PUBLIC_URL}/images_news/new_website2.png`, `${process.env.PUBLIC_URL}/images_news/new_website3.png`]},
                { date: "2025-07-11", title: "Presented a Poster at ACMB-JSMB2025", summary: "Presented research findings on the stimulus habituation mechanism of plants at ACMB-JSMB2025.", fullContent: "At ACMB-JSMB2025 (a joint conference of the Asian Conference on Mathematical Biology and the Annual Meeting of Japanese Society for Mathematical Biology), I presented a poster on my research topic: the stimulus habituation mechanism of Mimosa pudica. This joint conference is an important academic event where cutting-edge research in the field of mathematical biology from across Asia and Japan gathers. During the presentation, I shared new insights obtained through mathematical approaches and model construction regarding how plants adapt to environmental stimuli and change their responses. In particular, it was a very meaningful time to engage in lively discussions with participating researchers about the results of analyzing the stimulus habituation phenomenon, which can be called Mimosa pudica's 'memory,' using mathematical models.", images: [`${process.env.PUBLIC_URL}/images_news/ACMBJSMB1.jpg`, `${process.env.PUBLIC_URL}/images_news/ACMBJSMB2.jpg`] }
            ],
            view_more_button: "VIEW ALL",
            details_button: "View Details"
        },
        research: {
            title: "Research & Awards",
            description: "Overview of my research activities, awards, and grants received.",
            awards: [
                { year: "2024", title: "Science Castle Research Grant", prize: "THK Award", details: "Adopted for the research theme 'Automated and High-Precision Quantification of Mimosa Pudica Leaf Opening/Closing by Plant Phenotyping and Development of a Vibration Device.' Received support for developing essential experimental equipment." },
                { year: "2024", title: "Science Castle Research Grant", prize: "Value Co-creation Award (Daicel)", details: "Adopted for the research theme 'Chemical Elucidation of the Memory Mechanism for Stimuli in Mimosa Pudica.' The grant is expected to advance the research through a chemical approach." },
                { year: "2023", title: "1st Learning Co-creation Contest", prize: "Juichi Yamagiwa Award", details: "The results of research on the circadian rhythm of Mimosa pudica and the depth of learning in the research process were evaluated, and I became one of the inaugural winners." },
                { year: "2022 & 2023", title: "Nagano Prefecture Student Science Award", prize: "Governor's Prize (2 consecutive years)", details: "Received the Governor's Prize, the highest award, for two consecutive years for research related to Mimosa pudica. Both studies were recommended to the national competition as representatives of Nagano." },
                { year: "2023", title: "Science Castle Kanto Conference", prize: "Nipponham Award", details: "Received the award for an oral presentation on 'Elucidation and Control of Nyctinastic Movement in Mimosa Pudica by Quantifying Leaf Opening and Closing Status Using Deep Learning.' The originality of the research and presentation skills were highly evaluated." },
            ],
            publications_title: "Materials",
            download_button: "Download Material",
            publications: [
                { title: "The Evolutionary and Ecological Significance of Stimulus-Specific Habituation in Mimosa pudica L. A Mathematical Modeling Approach", journal: "ACMB-JSMB2025", year: 2025, pdf: `${process.env.PUBLIC_URL}/materials/poster-acmb-jsmb2025.pdf`, type: "Poster Presentation", details: "Evaluated the evolutionary and ecological significance of stimulus habituation in Mimosa pudica using mathematical models. Specifically, it showed that habituation is an effective adaptive strategy for reducing energy consumption and an optimal defense strategy in situations with a high risk of stimulus misrecognition, while verifying the validity of the model."},
                { title: "Evolutionary and Ecological Significance of Stimulus-Specific Habituation in Mimosa Pudica L.: Analysis Using Mathematical Models", journal: "N High School Research Department Journal 2025", year: 2025, pdf: `${process.env.PUBLIC_URL}/materials/paper-n-high-2025.pdf`, type: "Journal Article", details: "Quantitatively analyzed the adaptive significance of stimulus habituation in Mimosa pudica using mathematical models, demonstrating its role in improving energy efficiency and contributing to long-term energy accumulation. It clarifies the adaptive significance of habituation in suppressing unnecessary response costs and contributing to long-term energy accumulation." },
                { title: "Physiological Study of Adaptation Mechanism to Stimuli in Mimosa Pudica", journal: "Japanese Society of Plant Physiologists 2025", year: 2025, pdf: "", type: "Poster Presentation", details: "Physiologically elucidated the stimulus habituation mechanism of Mimosa pudica through adaptation verification by training, internal structure observation, and ion channel analysis. Explores a selective recognition mechanism that contributes to energy saving." },
                { title: "Elucidation of Step-up/Down Photo-shock Response by Quantifying Euglena Movement Using Deep Learning", journal: "Science Castle Kanto Conference", year: 2023, pdf: `${process.env.PUBLIC_URL}/materials/poster-euglena-2023.pdf`, type: "Poster Presentation", details: "This is the initial research that became the starting point for the Mimosa pudica study, exploring the relationship between the behavior of the single-celled organism Euglena towards light and its internal clock." }
            ]
        },
        projects: {
            title: "Ongoing & Main Projects",
            view_all_button: "VIEW ALL",
            items: [
                { image: `${process.env.PUBLIC_URL}/images/mimosa_hab.jpg`, title: "Elucidation of Stimulus-Specific Habituation Mechanism in Mimosa Pudica", description: "Studying the adaptation ability (habituation) of Mimosa pudica to stimuli using originally developed quantification technology and an omnidirectional stimulation device.", period: "Mar 2024 - Present", details: "This project aims to elucidate the mechanism of stimulus habituation, the phenomenon where Mimosa pudica 'gets used to' specific stimuli. By combining a uniquely developed omnidirectional stimulation device with image analysis technology using deep learning, it quantitatively evaluates the relationship between stimulus direction/intensity and habituation. The future goal is to clarify what mechanism maintains this ability." },
                { image: `${process.env.PUBLIC_URL}/images/mimosa.jpg`, title: "Nyctinasty (Circadian Rhythm) of Mimosa Pudica", description: "Researching the circadian rhythm of Mimosa pudica by observing its nyctinastic (sleep) movements, which serve as an output system of the rhythm.", period: "Apr 2021 - Feb 2024", details: "Focusing on 'nyctinasty' (leaf-closing at night) as an output of the plant's internal clock (circadian rhythm). A system was built to automatically quantify the degree of leaf opening and closing 24/7 using deep learning. This revealed behaviors such as the plant predicting sunset to start closing its leaves and finely adjusting the opening degree according to light intensity." },
                { image: `${process.env.PUBLIC_URL}/images/science.png`, title: "Science Delivery Service", description: "Planning science classrooms to address the educational gap between rural and urban areas and to increase opportunities for children to engage with science.", period: "Nov 2024 - Present", details: "This project was launched out of an awareness of the disparity in science education opportunities in rural areas, based on personal experience. It involves planning and running science classes for elementary school students in Nagano Prefecture on the theme of familiar nature. The ongoing activity aims to spark children's intellectual curiosity and convey the joy of science through observation and experiments." },
                { image: `${process.env.PUBLIC_URL}/images/hydra.png`, title: "Elucidating Classical Conditioning in Hydra", description: "Investigating whether classical conditioning, a type of learning, exists in Hydra vulgaris, which has a simple diffuse nervous system.", period: "Apr 2025 - Present", details: "This research verifies whether brainless Hydra vulgaris exhibits associative learning (classical conditioning). Feeding behavior-inducing reduced glutathione (unconditioned stimulus) and blue light (conditioned stimulus) that induces body contraction are repeatedly paired. Subsequently, it evaluates whether feeding behavior is induced by blue light alone, using AI-based behavioral analysis. This approaches the evolutionary origin of learning ability and explores the potential of Hydra as a new model organism in neuroscience." }
            ]
        },
        map: {
            title: "Global Activity Map",
            description: "Plotting my activity and study abroad locations on a map. Click on a pin for details.",
            locations: [
                { id: "san-francisco", name: "San Francisco, USA", image: `${process.env.PUBLIC_URL}/images/san.jpg`, details: "Visited as a member of the 'Nagano Delegation AOKI Kanrinmaru.' During the one-week stay, I had valuable experiences, including meetings with venture capitalists and the former U.S. Ambassador to Japan." },
                { id: "utah", name: "Utah, USA", image: `${process.env.PUBLIC_URL}/images/utah.png`, details: "Experienced a one-month homestay in the 5th grade. It was my first time abroad, which gave me a major culture shock and broadened my international perspective." },
                { id: "shanghai", name: "Shanghai, China", image: `${process.env.PUBLIC_URL}/images/shanghai.jpg`, details: "Experienced a two-week stay in a school dormitory in my third year of junior high. I visited famous local tourist spots and participated in school classes, deepening cultural exchange." },
                { id: "singapore", name: "Singapore", image: `${process.env.PUBLIC_URL}/images/singapore.png`, details: "Experienced a two-week homestay in my third year of junior high. Through interaction with my Muslim host family, I overcame cultural differences and deepened our mutual understanding." }
            ]
        },
        activities: {
            title: "Activities & Involvements",
            site_button: "Official Site",
            items: [
                { image: `${process.env.PUBLIC_URL}/images/SPICE_entre.png`, year: "2024-2025", title: "Stanford e-Entrepreneurship", event: "Received lectures in English with high school students from all over Japan and gave a joint presentation on education and health.", details: "Learned the fundamentals of entrepreneurship and business planning through online lectures by Stanford University instructors. Ultimately, my team developed a project to address educational disparities and presented it in English.", link: "https://spice.fsi.stanford.edu/fellowship/stanford-e-entrepreneurship-japan" },
                { image: `${process.env.PUBLIC_URL}/images/SPICE.png`, year: "2025", title: "Stanford e-Japan", event: "Received education on topics such as the U.S.-Japan alliance in English with high school students from across Japan and held discussions in English.", details: "Attended lectures by experts on U.S.-Japan relations, learning about diplomatic, cultural, and economic perspectives. Deepened international understanding and discussion skills through English debates with other participants.", link: "https://spice.fsi.stanford.edu/fellowship/stanford-e-japan" },
                { image: `${process.env.PUBLIC_URL}/images/n1.png`, year: "2024-2025", title: "N-ichi Dojo 5th Term", event: "Regarding the science education program, I delved into the vision, customer development, business planning, and learned the entrepreneurial spirit.", details: "To develop my 'Science Delivery Service' project into a viable venture, I learned practical entrepreneurial processes under the guidance of mentors, including business plan creation, target customer analysis, and revenue model consideration.", link: "https://www.sunaba.org/n1dojo" },
                { image: `${process.env.PUBLIC_URL}/images/UTokyo.jpg`, year: "2024-", title: "UtokyoGSC-NEXT 6th Term", event: "Participated in a STEAM education program hosted by the University of Tokyo's Institute of Industrial Science, engaging in lectures and discussions.", details: "Gained opportunities to deepen my research theme through lectures on cutting-edge science and technology from University of Tokyo professors. Interacting with highly motivated peers from across the country has been a great source of inspiration.", link: "https://gsc.iis.u-tokyo.ac.jp/" },
                { image: `${process.env.PUBLIC_URL}/images/advancelab.png`, year: "2024-", title: "ADvance Lab 1st Term", event: "As a member of ADvance Lab, a research institute for the next generation by the next generation, I engaged in project planning, corporate visits, and research.", details: "Currently serving as Vice Director, I am also involved in the lab's operations. I am particularly in charge of the 'Noyama (Fields and Mountains) Team,' promoting research projects that utilize the rich natural environment of Nagano.", link: "https://adlab.lne.st/" },
                { image: `${process.env.PUBLIC_URL}/images/aoki.png`, year: "2022-2023", title: "Nagano Delegation AOKI Entrepreneurship Program 7th Term", event: "Participated in a leadership training program for junior high school students sponsored by the AOKI Foundation. Learned about leadership and the 'Fail First' spirit through monthly lectures, two domestic training sessions, and an entrepreneurship program in Silicon Valley.", details: "This program, which I participated in during junior high school, is one of the origins of my current activities. The training in Silicon Valley, where I was exposed to a culture of fearlessly taking on challenges, greatly influenced my personal principles.", link: "https://aoki-zaidan.or.jp/srv_kanrin.php" },
                { image: `${process.env.PUBLIC_URL}/images/Tsukuba.png`, year: "2021-2022", title: "Tsukuba SKIP Academy", event: "Honed scientific literacy by taking online classes from mathematicians at the University of Tsukuba, which led to a research lab visit.", details: "Solidified the foundation of logical thinking necessary for scientific research by engaging with university-level mathematics and physics online. This experience has been instrumental in handling mathematical models in my current research.", link: "https://skip.tsukuba.ac.jp/" }
            ]
        },
        contact: {
            title: "Get In Touch",
            description: "If you are interested in my research or activities, please feel free to contact me.\nI welcome opportunities for collaborative research.",
            email: "koma1667@outlook.jp"
        },
        footer: {
            columns: [
                { title: "Explore", items: ["Profile", "Vision", "News", "Research", "Projects", "Map", "Former Site"] },
                { title: "Activities", items: ["Activities", "ADvance Lab"] },
                { title: "Connect", items: ["Contact", "X (Twitter)", "Instagram", "Facebook", "LinkedIn"] }
            ]
        },
        all_news_page: {
            title: "All News",
            back_button: "Back to Main Page"
        },
        all_projects_page: {
            title: "All Projects",
            back_button: "Back to Main Page"
        }
    }
};

// --- 新しいイントロアニメーション ---
const InteractiveIntro = ({ onFinish }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (isClicked) return;
        setIsClicked(true);
        setTimeout(onFinish, 2000); // アニメーション時間 + 少し待機 (3500msから変更)
    };

    const containerVariants = {
        exit: { 
            opacity: 0, 
            transition: { duration: 0.5, delay: 1.0 } // 3.0sから変更
        }
    };

    const textVariants = {
        initial: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    const stemVariants = {
        hidden: { pathLength: 0 },
        visible: {
            pathLength: 1,
            transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 }
        }
    };

    const leafVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1], // A more "bouncy" ease
                delay: 1.5 // After stem is mostly grown
            }
        }
    };

    return (
        <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit="exit"
            variants={containerVariants}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-emerald-50 cursor-pointer"
            onClick={handleClick}
        >
            <AnimatePresence>
                {!isClicked && (
                    <motion.div
                        variants={textVariants}
                        exit="exit"
                        className="text-center mb-4"
                    >
                        <p className="text-emerald-700 text-lg font-semibold">クリックして始めましょう</p>
                        <p className="text-emerald-600 text-md">Click to Start</p>
                    </motion.div>
                )}
            </AnimatePresence>
            <svg width="250" height="250" viewBox="0 0 200 200">
                {/* Ground Line - always visible */}
                <path
                    d="M 60,180 H 140"
                    stroke="#a3bfb0"
                    strokeWidth="3"
                />

                {isClicked && (
                    <>
                        {/* Stem */}
                        <motion.path
                            d="M 100,180 C 100,130 80,90 100,60"
                            stroke="#34d399"
                            strokeWidth="4"
                            fill="none"
                            initial="hidden"
                            animate="visible"
                            variants={stemVariants}
                        />

                        {/* Two Leaves */}
                        <motion.g initial="hidden" animate="visible">
                            <motion.path
                                d="M 100,60 C 80,65 70,85 80,100"
                                fill="#6ee7b7"
                                variants={leafVariants}
                                style={{ transformOrigin: "100px 60px" }}
                            />
                            <motion.path
                                d="M 100,60 C 120,65 130,85 120,100"
                                fill="#6ee7b7"
                                variants={leafVariants}
                                style={{ transformOrigin: "100px 60px" }}
                            />
                        </motion.g>
                    </>
                )}
            </svg>
        </motion.div>
    );
};


// --- アニメーション化されたテキストコンポーネント ---
const AnimatedText = ({ text }) => (
    <AnimatePresence mode="wait">
        <motion.span key={text} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {text}
        </motion.span>
    </AnimatePresence>
);

// --- アイコンコンポーネント ---
const XIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> );
const InstagramIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.117 0-3.483.011-4.71.069-2.734.124-3.914 1.3-4.034 4.034-.058 1.226-.069 1.588-.069 4.71s.011 3.483.069 4.71c.12 2.734 1.3 3.914 4.034 4.034 1.227.058 1.593.069 4.71.069s3.483-.011 4.71-.069c2.734-.124 3.914-1.3 4.034-4.034.058-1.226.069-1.588.069-4.71s-.011-3.483-.069-4.71c-.12-2.734-1.3-3.914-4.034-4.034-1.227-.058-1.593.069-4.71-.069zm0 2.882c-1.955 0-3.513 1.558-3.513 3.513s1.558 3.513 3.513 3.513 3.513-1.558 3.513-3.513-1.558-3.513-3.513-3.513zm0 5.584c-1.149 0-2.071-.922-2.071-2.071s.922-2.071 2.071-2.071 2.071.922 2.071 2.071-.922 2.071-2.071 2.071zm4.492-6.44c-.608 0-1.1.492-1.1 1.1s.492 1.1 1.1 1.1 1.1-.492 1.1-1.1-.492-1.1-1.1-1.1z" /></svg> );
const FacebookIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg> );
const LinkedinIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> );
const ChevronDownIcon = ({ isExpanded }) => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 text-gray-400"
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.3 }}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </motion.svg>
);
const MailIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);
const DownloadIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);
const ChevronLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);
const ChevronRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);
const ExternalLinkIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);


// --- カスタムカーソルコンポーネント ---
const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsHovering(!!e.target.closest('[data-hoverable="true"]'));
        };

        window.addEventListener("mousemove", mouseMove);
        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    const outerVariants = {
        default: {
            height: 32,
            width: 32,
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
        },
        hover: {
            height: 40,
            width: 40,
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
        },
    };

    const pulseTransition = isHovering 
        ? { // Hover state: "thump-thump" heartbeat
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            times: [0, 0.1, 0.3, 0.4, 1.5]
          }
        : { // Default state: slow, regular pulse
            duration: 1.7,
            ease: "easeInOut",
            repeat: Infinity,
            times: [0, 0.5, 1]
          };

    const scaleAnimation = isHovering ? [1, 1.5, 1, 1.5, 1] : [1, 1.4, 1];

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
            variants={outerVariants}
            animate={isHovering ? "hover" : "default"}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <motion.div
                className="w-full h-full rounded-full"
                style={{
                    backgroundColor: isHovering ? 'rgba(34, 197, 94, 0.25)' : 'rgba(16, 185, 129, 0.25)',
                    transition: 'background-color 0.2s ease-in-out',
                }}
                animate={{ scale: scaleAnimation }}
                transition={pulseTransition}
            />
        </motion.div>
    );
};

// --- グラデーションテキストコンポーネント ---
const GradientText = ({ children, className }) => {
    return (
        <span className={`bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500 text-transparent bg-clip-text ${className}`}>
            {children}
        </span>
    );
};


// --- ヘッダーコンポーネント ---
const Header = ({ lang, setLang, content, setPage }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        // もし別ページにいたら、まずホームページに戻す
        setPage('home');
        // 少し待ってからスクロールを実行
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm border-b border-gray-200' : 'bg-transparent'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <span data-hoverable="true" className="text-gray-900 font-bold text-xl cursor-pointer" onClick={() => scrollToSection('hero')}>Kazuhiro Komatsu</span>
                <div className="flex items-center">
                    <div className="hidden md:flex items-baseline space-x-1">
                        {Object.entries(content.nav).map(([key, value]) => (
                            <a data-hoverable="true" key={key} onClick={() => scrollToSection(key)} className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"><AnimatedText text={value} /></a>
                        ))}
                    </div>
                    <button data-hoverable="true" onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')} className="ml-4 px-3 py-1 border border-gray-300 text-gray-700 rounded-md text-sm font-semibold hover:bg-gray-100 hover:text-green-600 transition-colors">
                        <AnimatedText text={lang === 'ja' ? 'EN' : 'JA'} />
                    </button>
                </div>
            </nav>
        </header>
    );
};

// --- ヒーローセクション ---
const HeroSection = ({ content }) => {
    const titleText = content.title.split("");
    return (
        <section id="hero" className="h-screen flex flex-col justify-center items-center text-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 z-0 animated-aurora"></div>
            <div className="text-center z-10 p-4">
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter">
                    {titleText.map((el, i) => (
                        <motion.span key={content.title + i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }}>{el}</motion.span>
                    ))}
                </h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="mt-4 text-xl md:text-2xl text-gray-600">
                    <AnimatedText text={content.subtitle} />
                </motion.p>
            </div>
        </section>
    );
};

// --- 横スクロールセクション (展開機能付き) ---
const HorizontalScrollSection = ({ content, expandedItem, setExpandedItem }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} id="research" className="relative h-[300vh] bg-slate-50">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8 px-8">
                    <div className="w-screen flex-shrink-0 flex flex-col justify-center items-center text-gray-800 p-8">
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                            <GradientText><AnimatedText text={content.title} /></GradientText>
                        </h2>
                        <p className="text-lg md:text-xl max-w-2xl text-center text-gray-600"><AnimatedText text={content.description} /></p>
                    </div>
                    {content.awards.map((award, index) => {
                        const id = `research-${index}`;
                        const isExpanded = id === expandedItem;
                        return (
                            <motion.div
                                key={id}
                                layout
                                transition={{ duration: 0.5, type: 'spring' }}
                                data-hoverable="true"
                                onClick={() => setExpandedItem(isExpanded ? null : id)}
                                className="bg-white/80 backdrop-blur-md border border-gray-200/80 shadow-lg rounded-2xl p-8 w-[400px] flex-shrink-0 flex flex-col justify-center cursor-pointer"
                                style={{ height: isExpanded ? 'auto' : '300px' }}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-green-600"><AnimatedText text={award.year} /></p>
                                        <h3 className="text-2xl font-bold text-gray-800 mt-2"><AnimatedText text={award.title} /></h3>
                                    </div>
                                    <ChevronDownIcon isExpanded={isExpanded} />
                                </div>
                                <p className="text-lg text-gray-700 mt-1"><AnimatedText text={award.prize} /></p>
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto', transition: { delay: 0.2 } }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-4 overflow-hidden"
                                        >
                                            <p className="text-gray-600"><AnimatedText text={award.details} /></p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

// --- 通常のセクション ---
const ContentSection = ({ id, title, children, bgColor = "bg-white" }) => (
    <section id={id.toLowerCase()} className={`py-20 md:py-32 text-gray-800 relative ${bgColor}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-center mb-16"
            >
                <GradientText><AnimatedText text={title} /></GradientText>
            </motion.h2>
            {children}
        </div>
    </section>
);

// --- Newsセクション ---
const NewsSection = ({ content, onNewsSelect, setPage }) => (
    <ContentSection id="news" title={content.title} bgColor="bg-white">
        <div className="space-y-8">
            {content.items.slice(0, 2).map((item, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => onNewsSelect(item)}
                    data-hoverable="true"
                    className="bg-white/50 backdrop-blur-md border border-gray-200/80 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
                >
                    <div className="flex-1">
                        <p className="text-sm text-green-600"><AnimatedText text={item.date} /></p>
                        <h3 className="text-xl font-bold text-gray-800 mt-1"><AnimatedText text={item.title} /></h3>
                        <p className="text-gray-600 mt-2"><AnimatedText text={item.summary} /></p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 text-sm font-bold text-emerald-600 flex-shrink-0">
                        <AnimatedText text={content.details_button} />
                    </div>
                </motion.div>
            ))}
        </div>
        <div className="text-center mt-12">
            <a onClick={() => setPage('all-news')} data-hoverable="true" className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity duration-300 cursor-pointer">
                <AnimatedText text={content.view_more_button} />
            </a>
        </div>
    </ContentSection>
);

// --- Newsモーダル ---
const NewsModal = ({ newsItem, onClose }) => {
    if (!newsItem) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl p-8 max-w-2xl w-full border border-gray-200 shadow-2xl relative max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button data-hoverable="true" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl leading-none z-10">&times;</button>
                    <div className="overflow-y-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2"><AnimatedText text={newsItem.title} /></h2>
                        <p className="text-sm text-green-600 mb-4"><AnimatedText text={newsItem.date} /></p>
                        <div className="text-gray-600 whitespace-pre-line prose" dangerouslySetInnerHTML={{ __html: newsItem.fullContent.replace(/\n/g, '<br />') }} />
                        
                        {newsItem.images && newsItem.images.length > 0 && (
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {newsItem.images.map((img, index) => (
                                    <img 
                                        key={index} 
                                        src={img} 
                                        alt={`${newsItem.title} image ${index + 1}`} 
                                        className="w-full h-auto rounded-lg object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/e2e8f0/64748b?text=Image+Not+Found'; }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// --- 詳細ポップアップモーダル ---
const DetailModal = ({ item, onClose, content, handleDownload }) => {
    if (!item) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-gray-200 shadow-2xl relative overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button data-hoverable="true" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-3xl leading-none z-10">&times;</button>
                    {item.image && (
                        <div className="flex-shrink-0">
                            <img src={item.image} alt={item.title || item.name} className="w-full h-64 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x400/e2e8f0/64748b?text=Image+Not+Found'; }} />
                        </div>
                    )}
                    <div className="p-8 overflow-y-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2 pr-8"><GradientText><AnimatedText text={item.title || item.name} /></GradientText></h2>
                        {item.type && item.year && <p className="text-md font-semibold text-emerald-600 mb-4"><AnimatedText text={`${item.type} - ${item.year}`} /></p>}
                        {item.period && <p className="text-sm text-green-600 mb-4"><AnimatedText text={item.period} /></p>}
                        {item.event && <p className="text-lg text-gray-700 mb-4"><AnimatedText text={item.event} /></p>}
                        <p className="text-gray-600 whitespace-pre-line leading-relaxed"><AnimatedText text={item.details} /></p>
                         {item.pdf && (
                            <button 
                                onClick={(e) => handleDownload(e, item.pdf)}
                                data-hoverable="true" 
                                className="mt-6 inline-flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold px-4 py-2 rounded-lg transition-colors"
                            >
                                <DownloadIcon className="w-5 h-5" />
                                <AnimatedText text={content.research.download_button} />
                            </button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


// --- フッターコンポーネント ---
const Footer = ({ content, setPage }) => {
    const scrollToSection = (itemText) => {
        const targetId = itemText.toLowerCase().replace(/\s+/g, '-');
        
        const externalLinks = {
            'x-(twitter)': 'https://x.com/F7XUbvdcqB38059',
            'linkedin': 'https://www.linkedin.com/in/kazuhiro-komatsu-37302b289/',
            'instagram': 'https://www.instagram.com/steamkazu/',
            'facebook': 'https://www.facebook.com/share/1AjQu2jF5U/?mibextid=wwXIfr',
            'former-site': 'https://sites.google.com/view/kazuhirokomatsu',
            'advance-lab': 'https://adlab.lne.st/'
        };

        if (externalLinks[targetId]) {
            window.open(externalLinks[targetId], '_blank', 'noopener,noreferrer');
        } else {
            setPage('home');
            setTimeout(() => {
                document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    return (
        <footer className="border-t border-gray-200 py-16 text-gray-600 relative bg-gray-50/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {content.columns.map((column) => (
                        <div key={column.title}>
                            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase"><AnimatedText text={column.title} /></h3>
                            <ul className="mt-4 space-y-4">
                                {column.items.map((item) => (
                                    <li key={item}>
                                        <a data-hoverable="true" onClick={() => scrollToSection(item)} className="text-base text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                                            <AnimatedText text={item} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Kazuhiro Komatsu. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

// --- すべてのニュースページ ---
const AllNewsPage = ({ content, setPage, setSelectedNews, lang, setLang, setScrollToSectionId }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBack = () => {
        setScrollToSectionId('news');
        setPage('home');
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-50 min-h-screen"
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
                     <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                         <GradientText><AnimatedText text={content.all_news_page.title} /></GradientText>
                     </h1>
                    <div className="flex items-center gap-4">
                        <button data-hoverable="true" onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')} className="px-3 py-1 border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-100 hover:text-green-600 transition-colors">
                            <AnimatedText text={lang === 'ja' ? 'EN' : 'JA'} />
                        </button>
                         <button 
                            onClick={handleBack} 
                            data-hoverable="true" 
                            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-bold px-4 py-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition-colors duration-300"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                            <AnimatedText text={content.all_news_page.back_button} />
                        </button>
                    </div>
                </div>
                <div className="space-y-6">
                    {content.news.items.map((item, index) => (
                            <motion.div 
                                key={`news-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => setSelectedNews(item)}
                                data-hoverable="true"
                                className="bg-white p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer shadow-sm hover:shadow-lg transition-shadow border border-gray-200"
                            >
                                <div className="flex-1">
                                    <p className="text-sm text-green-600"><AnimatedText text={item.date} /></p>
                                    <h3 className="text-xl font-bold text-gray-800 mt-1"><AnimatedText text={item.title} /></h3>
                                    <p className="text-gray-600 mt-2"><AnimatedText text={item.summary} /></p>
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-6 text-sm font-bold text-emerald-600 flex-shrink-0">
                                    <AnimatedText text={content.details_button} />
                                </div>
                            </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// --- すべてのプロジェクトページ ---
const AllProjectsPage = ({ content, setPage, setSelectedDetail, lang, setLang, setScrollToSectionId }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBack = () => {
        setScrollToSectionId('projects');
        setPage('home');
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-50 min-h-screen"
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
                     <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                         <GradientText><AnimatedText text={content.all_projects_page.title} /></GradientText>
                     </h1>
                     <div className="flex items-center gap-4">
                        <button data-hoverable="true" onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')} className="px-3 py-1 border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-100 hover:text-green-600 transition-colors">
                            <AnimatedText text={lang === 'ja' ? 'EN' : 'JA'} />
                        </button>
                         <button 
                            onClick={handleBack} 
                            data-hoverable="true" 
                            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-bold px-4 py-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition-colors duration-300"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                            <AnimatedText text={content.all_projects_page.back_button} />
                        </button>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {content.projects.items.map((item, index) => (
                            <motion.div
                                key={`project-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => setSelectedDetail(item)}
                                data-hoverable="true"
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group"
                            >
                                <div className="aspect-video overflow-hidden">
                                     <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x450/e2e8f0/64748b?text=Image+Not+Found'; }} />
                                </div>
                                <div className="p-6">
                                    <p className="text-sm text-green-600"><AnimatedText text={item.period} /></p>
                                    <h3 className="text-2xl font-bold text-gray-800 mt-2"><AnimatedText text={item.title} /></h3>
                                    <p className="text-gray-600 mt-3"><AnimatedText text={item.description} /></p>
                                </div>
                            </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// --- プロジェクトスライダーセクション ---
const ProjectSliderSection = ({ content, setSelectedDetail, setPage }) => {
    const [projectIndex, setProjectIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    };

    const paginate = useCallback((newDirection) => {
        setDirection(newDirection);
        setProjectIndex((prevIndex) => {
            const numItems = content.items.length;
            return (prevIndex + newDirection + numItems) % numItems;
        });
    }, [content.items.length]);

    useEffect(() => {
        const projectInterval = setInterval(() => paginate(1), 7000);
        return () => clearInterval(projectInterval);
    }, [paginate]);

    return (
        <ContentSection id="projects" title={content.title}>
            <div className="relative w-full max-w-3xl mx-auto shadow-2xl rounded-2xl overflow-hidden aspect-[16/9]">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={projectIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "tween", ease: "easeInOut", duration: 0.8 },
                            opacity: { duration: 0.4 }
                        }}
                        className="absolute inset-0 w-full h-full cursor-pointer"
                        onClick={() => setSelectedDetail(content.items[projectIndex])}
                        data-hoverable="true"
                    >
                        <img src={content.items[projectIndex].image} alt={content.items[projectIndex].title} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1200x675/e2e8f0/64748b?text=Image+Not+Found'; }}/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <h3 className="text-3xl font-bold"><AnimatedText text={content.items[projectIndex].title} /></h3>
                            <p className="mt-2 text-lg"><AnimatedText text={content.items[projectIndex].description} /></p>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <button onClick={() => paginate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 text-gray-800 z-10 transition-colors" data-hoverable="true"><ChevronLeftIcon className="w-6 h-6"/></button>
                <button onClick={() => paginate(1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 text-gray-800 z-10 transition-colors" data-hoverable="true"><ChevronRightIcon className="w-6 h-6"/></button>
            </div>
            <div className="text-center mt-12">
                <a onClick={() => setPage('all-projects')} data-hoverable="true" className="inline-block border border-green-600 text-green-600 font-bold px-6 py-3 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-300 cursor-pointer">
                    <AnimatedText text={content.view_all_button} />
                </a>
            </div>
        </ContentSection>
    );
};


// --- メインアプリケーションコンポーネント ---
export default function App() {
    const [lang, setLang] = useState('ja');
    const [page, setPage] = useState('home'); // 'home', 'all-news', 'all-projects'
    const [selectedNews, setSelectedNews] = useState(null);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [showIntro, setShowIntro] = useState(true);
    const [expandedItem, setExpandedItem] = useState(null);
    const [copied, setCopied] = useState(false);
    const [scrollToSectionId, setScrollToSectionId] = useState(null);
    
    const currentContent = content[lang];
    const cvUrl = "https://drive.google.com/file/d/1LUlTviJPBxVjce3lwcg-6IDZ1YOTdDn9/view?usp=sharing";

    const handleCopyEmail = () => {
        const textArea = document.createElement("textarea");
        textArea.value = currentContent.contact.email;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Email copy failed', err);
        }
        document.body.removeChild(textArea);
    };

    const handleDownload = (e, pdfPath) => {
        e.stopPropagation(); 
        const link = document.createElement('a');
        link.href = pdfPath;
        
        const filename = pdfPath.substring(pdfPath.lastIndexOf('/') + 1);
        link.setAttribute('download', filename);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const MainContent = () => {
        const [publicationIndex, setPublicationIndex] = useState(
            Math.floor(currentContent.research.publications.length / 2)
        );

        useEffect(() => {
            if (scrollToSectionId) {
                const timer = setTimeout(() => {
                    document.getElementById(scrollToSectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setScrollToSectionId(null); 
                }, 500); 

                return () => clearTimeout(timer);
            }
        }, [scrollToSectionId]); 

        return (
            <>
                <Header lang={lang} setLang={setLang} content={currentContent} setPage={setPage} />
                <HeroSection content={currentContent.hero} />
                <ContentSection id="profile" title={currentContent.profile.title}>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
                        <p className="text-2xl font-bold text-gray-900"><AnimatedText text={currentContent.profile.name} /></p>
                        <p className="mt-4 text-lg text-gray-600"><AnimatedText text={currentContent.profile.affiliation} /></p>
                        <p className="mt-6 text-lg text-gray-700 leading-relaxed"><AnimatedText text={currentContent.profile.description} /></p>
                        <a href={cvUrl} target="_blank" rel="noopener noreferrer" data-hoverable="true" className="mt-8 inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity duration-300">
                            <AnimatedText text={currentContent.profile.cv_button} />
                        </a>
                    </motion.div>
                </ContentSection>
                <ContentSection id="vision" title={currentContent.vision.title} bgColor="bg-slate-50">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"><AnimatedText text={currentContent.vision.heading} /></h2>
                        <p className="mt-2 text-xl md:text-2xl text-gray-600"><AnimatedText text={currentContent.vision.subheading} /></p>
                        <p className="mt-8 text-lg text-gray-700 leading-relaxed whitespace-pre-line"><AnimatedText text={currentContent.vision.description} /></p>
                    </motion.div>
                </ContentSection>
                <NewsSection content={currentContent.news} onNewsSelect={setSelectedNews} setPage={setPage} />
                <HorizontalScrollSection content={currentContent.research} expandedItem={expandedItem} setExpandedItem={setExpandedItem} />
                <ContentSection id="publications" title={currentContent.research.publications_title} bgColor="bg-slate-50">
                    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
                        {currentContent.research.publications.map((pub, index) => {
                            const distance = index - publicationIndex;
                            const total = currentContent.research.publications.length;
                            const isCentered = index === publicationIndex;
                            
                            return (
                                <motion.div
                                    key={pub.title}
                                    className="absolute bg-white border border-gray-200 shadow-lg cursor-pointer flex flex-col items-center justify-center text-center p-4"
                                    style={{
                                        width: 420, 
                                        height: 310,
                                        clipPath: "path('M0 155 C 70 -50, 350 -50, 420 155 C 350 360, 70 360, 0 155 Z')"
                                    }}
                                    data-hoverable="true"
                                    onMouseEnter={() => setPublicationIndex(index)}
                                    onClick={() => { if (isCentered) setSelectedDetail(pub) }}
                                    animate={{
                                        x: distance * 300, 
                                        scale: isCentered ? 1.05 : 0.8,
                                        zIndex: total - Math.abs(distance),
                                        opacity: isCentered ? 1 : 0.3,
                                        rotate: distance * 5,
                                    }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                >
                                    <div className="w-9/12">
                                        <p className="text-xs font-semibold text-green-600">{pub.type} - {pub.year}</p>
                                        <h3 className="text-lg font-bold text-gray-800 mt-3 leading-tight">{pub.title}</h3>
                                        <p className="text-xs text-gray-500 mt-3 truncate">{pub.journal}</p>
                                        {pub.pdf && isCentered && (
                                            <motion.button
                                                onClick={(e) => handleDownload(e, pub.pdf)}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="mt-4 inline-block bg-transparent border-none cursor-pointer"
                                            >
                                                <DownloadIcon className="w-8 h-8 text-emerald-500 hover:text-emerald-700 transition-colors" />
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </ContentSection>
                <ProjectSliderSection 
                    content={currentContent.projects}
                    setSelectedDetail={setSelectedDetail}
                    setPage={setPage}
                />
                <ContentSection id="map" title={currentContent.map.title} bgColor="bg-slate-50">
                    <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto"><AnimatedText text={currentContent.map.description} /></p>
                    <div className="relative w-full max-w-6xl mx-auto aspect-video bg-gray-100 rounded-lg p-2 border border-gray-200">
                        <img src={`${process.env.PUBLIC_URL}/images/map.png`} alt="World Map" className="w-full h-full object-contain" />
                        {currentContent.map.locations.map(loc => {
                            const coords = { 
                                "singapore": { x: 39.2, y: 53 }, 
                                "shanghai": { x: 43.5, y: 44.3 }, 
                                "utah": { x: 69, y: 39 }, 
                                "san-francisco": { x: 66.4, y: 40 }
                            };
                            const pos = coords[loc.id] || {x: 50, y: 50};
                            return (
                                <motion.div key={loc.id} onClick={() => setSelectedDetail(loc)} className="absolute cursor-pointer" style={{ left: `${pos.x}%`, top: `${pos.y}%` }} data-hoverable="true">
                                    <motion.div className="relative flex items-center justify-center">
                                        <motion.div className="absolute w-6 h-6 bg-emerald-500/50 rounded-full" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </ContentSection>
                <ContentSection id="activities" title={currentContent.activities.title}>
                    {currentContent.activities.items.map((item, index) => (
                        <motion.div 
                            key={`activity-${index}`} 
                            initial={{ opacity: 0, x: -20 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            viewport={{ once: true, amount: 0.3 }} 
                            transition={{ duration: 0.5, delay: index * 0.1 }} 
                            className="border-b border-gray-200 py-6 group flex flex-col sm:flex-row gap-4 justify-between items-start"
                        >
                            <div 
                                onClick={() => setSelectedDetail(item)} 
                                className="flex-1 cursor-pointer"
                                data-hoverable="true"
                            >
                                <p className="text-sm text-green-600 group-hover:text-emerald-500 transition-colors"><AnimatedText text={item.year} /></p>
                                <h3 className="text-xl font-bold text-gray-800 mt-1 group-hover:text-emerald-500 transition-colors"><AnimatedText text={item.title} /></h3>
                                <p className="text-gray-600 mt-2"><AnimatedText text={item.event} /></p>
                            </div>
                            {item.link && item.link !== "#" && (
                                <a 
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    data-hoverable="true"
                                    className="mt-2 sm:mt-0 flex-shrink-0 inline-flex items-center gap-2 text-sm bg-slate-100 text-slate-600 font-semibold px-3 py-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors"
                                >
                                    <AnimatedText text={currentContent.activities.site_button} />
                                    <ExternalLinkIcon className="w-4 h-4" />
                                </a>
                            )}
                        </motion.div>
                    ))}
                </ContentSection>
                <ContentSection id="contact" title={currentContent.contact.title} bgColor="bg-slate-50">
                    <div className="text-center">
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto whitespace-pre-line"><AnimatedText text={currentContent.contact.description} /></p>
                        <div className="flex justify-center items-center space-x-6 md:space-x-8 flex-wrap">
                            <motion.a data-hoverable="true" onClick={handleCopyEmail} className="relative flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors cursor-pointer text-lg p-2">
                                <MailIcon className="w-8 h-8"/>
                                <span>{currentContent.contact.email}</span>
                                <AnimatePresence>
                                {copied && <motion.span initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-md">Copied!</motion.span>}
                                </AnimatePresence>
                            </motion.a>
                            <motion.a data-hoverable="true" href="https://x.com/F7XUbvdcqB38059" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: "#10b981" }} whileTap={{ scale: 0.9 }} className="text-gray-400 transition-colors p-2"><XIcon /></motion.a>
                            <motion.a data-hoverable="true" href="https://www.instagram.com/steamkazu/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: "#10b981" }} whileTap={{ scale: 0.9 }} className="text-gray-400 transition-colors p-2"><InstagramIcon /></motion.a>
                            <motion.a data-hoverable="true" href="https://www.facebook.com/share/1AjQu2jF5U/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: "#10b981" }} whileTap={{ scale: 0.9 }} className="text-gray-400 transition-colors p-2"><FacebookIcon /></motion.a>
                            <motion.a data-hoverable="true" href="https://www.linkedin.com/in/kazuhiro-komatsu-37302b289/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: "#10b981" }} whileTap={{ scale: 0.9 }} className="text-gray-400 transition-colors p-2"><LinkedinIcon /></motion.a>
                        </div>
                    </div>
                </ContentSection>
                <Footer content={currentContent.footer} setPage={setPage} />
            </>
        )
    };

    return (
        <div className="bg-white text-gray-800 font-['Noto_Sans_JP',_sans-serif] cursor-default md:cursor-none relative">
            <AnimatePresence>
                {showIntro && <InteractiveIntro onFinish={() => setShowIntro(false)} />}
            </AnimatePresence>
            
            <AnimatePresence mode="wait">
                {!showIntro && (
                    <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                        <CustomCursor />
                        <NewsModal newsItem={selectedNews} onClose={() => setSelectedNews(null)} />
                        <DetailModal item={selectedDetail} onClose={() => setSelectedDetail(null)} content={currentContent} handleDownload={handleDownload} />
                        {page === 'home' && <MainContent />}
                        {page === 'all-news' && <AllNewsPage content={currentContent} setPage={setPage} setSelectedNews={setSelectedNews} lang={lang} setLang={setLang} setScrollToSectionId={setScrollToSectionId} />}
                        {page === 'all-projects' && <AllProjectsPage content={currentContent} setPage={setPage} setSelectedDetail={setSelectedDetail} lang={lang} setLang={setLang} setScrollToSectionId={setScrollToSectionId} />}
                    </motion.div>
                )}
            </AnimatePresence>
            <style>{`
                .animated-aurora {
                    background: linear-gradient(125deg, #f0fdf4, #dcfce7, #f3e8ff, #fefce8, #e0f2fe);
                    background-size: 400% 400%;
                    animation: gradient-animation 20s ease infinite;
                }
                @keyframes gradient-animation {
                    0% { background-position: 0% 50%; }
                    25% { background-position: 50% 100%; }
                    50% { background-position: 100% 50%; }
                    75% { background-position: 50% 0%; }
                    100% { background-position: 0% 50%; }
                }
                .prose {
                    max-width: none;
                }
            `}</style>
        </div>
    );
}
