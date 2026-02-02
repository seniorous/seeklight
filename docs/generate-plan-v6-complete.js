/**
 * 拾光项目计划书生成器 v6 (完整版)
 * 严格保留原文档所有内容，并追加扩充内容
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        PageNumber, PageBreak, ShadingType, VerticalAlign, TableOfContents,
        SectionType, NumberFormat } = require('docx');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'diagrams', 'images-v2');
const chartDir = path.join(__dirname, 'images', 'v3.0-expansion-charts');
const feasibilityDir = path.join(__dirname, 'images', 'v4.0-feasibility-charts');
const memoryArchDir = path.join(__dirname, 'images', 'v5.0-memory-arch-charts');
const v6ChartDir = path.join(__dirname, 'images', 'v6.0-new-charts');
const logoDir = path.join(__dirname, 'images', 'logos');
const screenshotDir = path.join(__dirname, 'images', 'screenshot');

function readImg(name, dir = imgDir) {
    const p = path.join(dir, name);
    return fs.existsSync(p) ? fs.readFileSync(p) : null;
}

// 正文段落
function p(text) {
    return new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { line: 360, before: 60, after: 60 },
        indent: { firstLine: 480 },
        children: [new TextRun({ text, font: 'SimSun', size: 24 })]
    });
}

// 居中段落
function pCenter(text, size = 24, bold = false, font = 'SimSun') {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text, font, size, bold })]
    });
}

// 一级标题
function h1(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
        children: [new TextRun({ text, font: 'SimHei', size: 32, bold: true })]
    });
}

// 二级标题
function h2(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 150 },
        children: [new TextRun({ text, font: 'SimHei', size: 28, bold: true })]
    });
}

// 三级标题
function h3(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text, font: 'SimHei', size: 24, bold: true })]
    });
}

// 四级标题
function h4(text) {
    return new Paragraph({
        spacing: { before: 150, after: 80 },
        children: [new TextRun({ text, font: 'SimHei', size: 22, bold: true })]
    });
}

// 表格
function createTable(headers, rows, widths) {
    const border = { style: BorderStyle.SINGLE, size: 1, color: '000000' };
    const borders = { top: border, bottom: border, left: border, right: border };
    return new Table({
        columnWidths: widths,
        rows: [
            new TableRow({
                tableHeader: true,
                children: headers.map((h, i) => new TableCell({
                    borders, width: { size: widths[i], type: WidthType.DXA },
                    shading: { fill: 'E7E6E6', type: ShadingType.CLEAR },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: h, font: 'SimHei', size: 21, bold: true })] })]
                }))
            }),
            ...rows.map(row => new TableRow({
                children: row.map((cell, i) => new TableCell({
                    borders, width: { size: widths[i], type: WidthType.DXA },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: cell, font: 'SimSun', size: 21 })] })]
                }))
            }))
        ]
    });
}

// 图注
function caption(text) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 200 },
        children: [new TextRun({ text, font: 'SimSun', size: 20, italics: true })]
    });
}

// 参考文献
function ref(text) {
    return new Paragraph({
        spacing: { before: 60, after: 60 },
        indent: { left: 420, hanging: 420 },
        children: [new TextRun({ text, font: 'SimSun', size: 20 })]
    });
}

// 插入图片
function insertImage(filename, captionText, w = 450, h = 280, dir = imgDir) {
    const data = readImg(filename, dir);
    const elements = [];
    if (data) {
        elements.push(new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 80 },
            children: [new ImageRun({
                type: 'png', data,
                transformation: { width: w, height: h },
                altText: { title: captionText, description: captionText, name: filename }
            })]
        }));
    }
    elements.push(caption(captionText));
    return elements;
}

// 插入扩充图表
function insertChart(filename, captionText, w = 480, h = 300) {
    return insertImage(filename, captionText, w, h, chartDir);
}

// 插入v6新增图表
function insertV6Chart(filename, captionText, w = 520, h = 320) {
    return insertImage(filename, captionText, w, h, v6ChartDir);
}

// 插入可行性分析图表
function insertFeasibilityChart(filename, captionText, w = 500, h = 320) {
    return insertImage(filename, captionText, w, h, feasibilityDir);
}

// 插入层次化记忆架构图表（v5.0版本）
function insertMemoryArchChart(filename, captionText, w = 500, h = 320) {
    return insertImage(filename, captionText, w, h, memoryArchDir);
}

// 插入MVP版本界面截图（带原型标注）
function insertScreenshot(filename, captionText, w = 220, h = 440) {
    const elements = insertImage(filename, captionText, w, h, screenshotDir);
    // 添加原型说明
    elements.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 150 },
        children: [new TextRun({ text: '（MVP原型界面，非成品布局，持续改善中）', font: 'SimSun', size: 18, color: '666666', italics: true })]
    }));
    return elements;
}

// 插入双栏并行截图（用于节省空间，居中对齐）
function insertDualScreenshots(file1, cap1, file2, cap2, w = 160, h = 340) {
    const data1 = readImg(file1, screenshotDir);
    const data2 = readImg(file2, screenshotDir);
    const border = { style: BorderStyle.NONE, size: 0 };
    const borders = { top: border, bottom: border, left: border, right: border };
    const elements = [];
    
    // 创建双栏表格放置图片（居中对齐）
    const imgTable = new Table({
        alignment: AlignmentType.CENTER,
        columnWidths: [4000, 4000],
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        borders,
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            data1 ? new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [new ImageRun({
                                    type: 'png', data: data1,
                                    transformation: { width: w, height: h },
                                    altText: { title: cap1, description: cap1, name: file1 }
                                })]
                            }) : pCenter('[图片缺失]')
                        ]
                    }),
                    new TableCell({
                        borders,
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            data2 ? new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [new ImageRun({
                                    type: 'png', data: data2,
                                    transformation: { width: w, height: h },
                                    altText: { title: cap2, description: cap2, name: file2 }
                                })]
                            }) : pCenter('[图片缺失]')
                        ]
                    })
                ]
            }),
            // 图注行
            new TableRow({
                children: [
                    new TableCell({
                        borders,
                        children: [new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [new TextRun({ text: cap1, font: 'SimSun', size: 18, italics: true })]
                        })]
                    }),
                    new TableCell({
                        borders,
                        children: [new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [new TextRun({ text: cap2, font: 'SimSun', size: 18, italics: true })]
                        })]
                    })
                ]
            })
        ]
    });
    
    elements.push(imgTable);
    // 添加说明：非成品布局
    elements.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 150 },
        children: [new TextRun({ text: '（MVP原型界面，非成品布局，持续改善中）', font: 'SimSun', size: 18, color: '666666', italics: true })]
    }));
    return elements;
}

// 插入封面Logo（无图注）
function insertCoverLogo(filename, w = 200, h = 75) {
    const data = readImg(filename, logoDir);
    if (data) {
        return new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 100 },
            children: [new ImageRun({
                type: 'png', data,
                transformation: { width: w, height: h },
                altText: { title: filename, description: filename, name: filename }
            })]
        });
    }
    return pCenter('[Logo]', 24);
}

// 空行
function emptyLine(count = 1) {
    return Array(count).fill(new Paragraph({ children: [] }));
}

// ========== 创建文档 ==========
const doc = new Document({
    styles: {
        default: { document: { run: { font: 'SimSun', size: 24 } } },
        paragraphStyles: [
            { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                run: { size: 32, bold: true, font: 'SimHei' },
                paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
            { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                run: { size: 28, bold: true, font: 'SimHei' },
                paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
            { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                run: { size: 24, bold: true, font: 'SimHei' },
                paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } }
        ]
    },
    sections: [
        // ========== 封面 ==========
        {
            properties: {
                page: { margin: { top: 1440, right: 1800, bottom: 1440, left: 1800 },
                    pageNumbers: { formatType: NumberFormat.UPPER_ROMAN, start: 1 } },
                titlePage: true
            },
            children: [
                new Table({
                    columnWidths: [1400, 7100],
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ rowSpan: 2, verticalAlign: VerticalAlign.CENTER,
                                    children: [pCenter('[大赛LOGO]', 20)] }),
                                new TableCell({ verticalAlign: VerticalAlign.CENTER,
                                    children: [new Paragraph({ children: [new TextRun({ text: '第十九届全国大学生软件创新大赛', font: 'SimSun', size: 24, bold: true })] })] })
                            ]
                        }),
                        new TableRow({
                            children: [new TableCell({ verticalAlign: VerticalAlign.CENTER,
                                children: [new Paragraph({ children: [new TextRun({ text: '文档编号：SWC2026-拾光', font: 'SimSun', size: 24, bold: true })] })] })]
                        })
                    ]
                }),
                ...emptyLine(3), insertCoverLogo('logo_v4_c_memory_bubble.png', 280, 105), ...emptyLine(3),
                pCenter('拾光——基于层次化记忆架构的AI智能相册系统', 32, true, 'SimHei'), ...emptyLine(1),
                pCenter('SeekLight: An AI-Powered Smart Album System with Hierarchical Memory Architecture', 18, false, 'Times New Roman'), ...emptyLine(2),
                pCenter('项目计划书', 36, true, 'SimHei'), pCenter('Version: 3.0', 24, true), ...emptyLine(2),
                insertCoverLogo('team_v3_four_members.png', 260, 98), ...emptyLine(3),
                pCenter('2026-02-01', 24, true), ...emptyLine(1), pCenter('All Rights Reserved', 24, true)
            ]
        },
        // ========== 变更历史 ==========
        {
            properties: { page: { margin: { top: 1440, right: 1800, bottom: 1440, left: 1800 } }, type: SectionType.NEXT_PAGE },
            children: [
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
                    children: [new TextRun({ text: '文档变更历史', font: 'SimHei', size: 32, bold: true })] }),
                createTable(
                    ['版本', '修改日期', '修改人', '修改说明'],
                    [
                        ['1.0', '2026-01-10', '项目组', '初稿完成，确定项目概述与技术方案框架'],
                        ['1.1', '2026-01-15', '项目组', '完善技术方案细节，新增系统流程图与架构图'],
                        ['1.2', '2026-01-20', '项目组', '补充市场分析与用户场景分析'],
                        ['1.3', '2026-01-25', '项目组', '完善技术可行性分析，建立功能-技术对照论证'],
                        ['1.4', '2026-01-28', '项目组', '新增层次化记忆架构技术论证'],
                        ['1.5', '2026-01-30', '项目组', '优化图表可视化，完善技术成熟度评估'],
                        ['1.6', '2026-01-31', '项目组', '整合项目Logo与团队Logo，完善封面设计'],
                        ['2.0', '2026-02-01', '项目组', '整合MVP原型界面展示，完善关键技术论述'],
                        ['2.1', '2026-02-01', '项目组', '更新市场可行性分析，完善SWOT战略分析']
                    ],
                    [1200, 1800, 1500, 4500]
                )
            ]
        },
        // ========== 目录 ==========
        {
            properties: { page: { margin: { top: 1440, right: 1800, bottom: 1440, left: 1800 } }, type: SectionType.NEXT_PAGE },
            children: [
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
                    children: [new TextRun({ text: '目录', font: 'SimHei', size: 36, bold: true })] }),
                new TableOfContents('目录', { hyperlink: true, headingStyleRange: '1-3' })
            ]
        },
        // ========== 正文 ==========
        {
            properties: {
                page: { margin: { top: 1440, right: 1800, bottom: 1440, left: 1800 },
                    pageNumbers: { formatType: NumberFormat.DECIMAL, start: 1 } },
                type: SectionType.NEXT_PAGE
            },
            headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: '第十九届全国大学生软件创新大赛 - 项目计划书', font: 'SimSun', size: 18 })] })] }) },
            footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: '第 ', font: 'SimSun', size: 20 }), new TextRun({ children: [PageNumber.CURRENT], font: 'SimSun', size: 20 }),
                    new TextRun({ text: ' 页', font: 'SimSun', size: 20 })] })] }) },
            children: [
                // ==================== 1 项目概述 ====================
                h1('1 项目概述'),
                
                // === 1.1 项目背景 ===
                h2('1.1 项目背景'),
                
                // 【场景引入——痛点共鸣】
                p('三个月前保存的那张星巴克发票，报销截止日前翻遍相册也找不到；朋友发来的快递单号截图，第二天就淹没在上千张照片里；微信聊天里截图保存的会议室密码，开会时怎么也想不起存在哪里。'),
                p('这不是某一个人的困境。根据新华日报《你电子囤物吗》专题调查[1]，82%的受访者承认存在数字囤积习惯，其中照片以59%的占比位居囤积内容首位。更令人担忧的是，《Frontiers in Psychology》2025年的研究表明[2]，21.5%的年轻人群体已呈现病理性数字囤积倾向——这一比例是一般人群的4至6倍。数字囤积不仅占用存储空间，还会对用户的认知功能产生负面影响，疲劳在数字囤积与认知失败之间起着显著的中介作用。'),
                
                // 【核心矛盾——存储与检索的不对称】
                p('存储从未如此容易，检索从未如此困难。我们拥有有史以来最强大的智能手机——支持数十亿参数的AI模型；我们拥有有史以来最智能的相册——能识别人脸、场景、物体。然而，当需要从上千张截图中找到三个月前的那张发票时，所有这些强大的AI能力都帮不上忙。问题出在哪里？'),
                p('传统相册仅能按时间和地点进行索引，缺乏对截图内容的语义理解能力。截图实质上是一种非结构化的数据容器，其中可能包含文本信息（如快递单号、会议接入码）、视觉信息（如商品款式、界面截图）以及上下文信息（如聊天对象、应用来源）等多维数据。对于三个月前保存的某张微信转账截图，用户往往需要在数千张照片中逐一翻找，这一过程的时间成本和认知负担极高。存储容易与检索困难之间的不对称，正是本项目切入的核心市场空白。'),
                
                // 【时代机遇——为什么是现在】
                p('端侧AI算力的成熟使这一问题首次有了根本性解决的可能。根据IDC《Worldwide AI Smartphone Forecast, 2025–2029》报告[3]，2025年AI智能手机出货量将首次超过非AI手机，生成式AI手机占比预计在2028-2029年达到70%。2026年将成为市场格局变革的关键节点——中端机型将大规模采用生成式AI技术，端侧AI将从旗舰机型向中端市场下沉。这意味着，曾经只有云端才能提供的智能能力，现在可以在用户手机本地完成——数据不出设备，隐私得到保护，检索触手可及。'),
                
                // 【解决方案——拾光的价值主张】
                p('拾光正是为解决这一困境而生。作为一款能够使用自然语言进行搜索的AI智能相册应用，用户只需输入一句话——「上周的咖啡发票」「朋友发的快递单号」「上次开会的会议室密码」——即可精准定位目标截图，无需依赖文件名或手动标签。'),
                pCenter('核心价值主张：用一句话，找到任何截图。', 24, true, 'SimHei'),
                
                // 【从"理解图片"到"理解生活"——为什么需要记忆】
                h4('从「理解图片」到「理解生活」'),
                p('然而，仅仅实现「语义理解单张图片」并不能真正解决用户的检索困境。回顾开头的三个场景，用户的检索意图往往是模糊的、跨时间的、甚至跨越多张图片的：「星巴克发票」——用户可能并不记得具体是哪家门店、哪个日期，只记得「三个月前」和「咖啡」；「上次去海边的照片」——用户需要的不是某一张特定的照片，而是一次旅行经历的所有图片；「小王发的那个地址」——用户记住的是人物和场景，而非图片的具体内容。'),
                p('传统的AI相册能够理解「这张图片是什么」——识别出图中有沙滩、椰子树、酒店。但用户真正需要的是系统能够理解「我经历了什么」——推断出「这是用户的三亚之旅」，并将相关的50张照片关联在一起。这是从感知到认知的跨越，也是单张图片理解与跨图片记忆的本质区别。'),
                p('这一认知需求催生了本项目的核心创新——层次化记忆架构。借鉴Stanford大学Generative Agents研究[4]中的Reflection机制，拾光构建了短期记忆（单图理解）、长期记忆（跨图推断）和隐式记忆（偏好学习）的三层体系。系统不仅能回答「这张图片是什么」，更能回答「用户最近在做什么」、「用户喜欢什么」。在隐私保护方面，拾光的核心定位可以概括为「默认端侧运行保护隐私，需要时可开启云端增强」。'),
                
                // 认知跃升图 - 紧跟过渡段落，语义连贯
                ...insertMemoryArchChart('diagram_cognitive_leap.png', '图1-1 认知跃升：从理解图片到理解生活', 550, 320),
                
                // === 1.1.1 数字囤积困境的深层原因（原1.1.4提前）===
                h3('1.1.1 数字囤积困境的深层原因'),
                p('数字囤积（Digital Hoarding）是指个体过度收集和保存数字文件，同时难以删除不再需要的内容的行为模式。这一现象在中国大学生群体中尤为普遍，其背后存在深刻的心理学机制。根据2025年发表于《Frontiers in Psychology》的研究，错失恐惧（Fear of Missing Out，简称FOMO）是驱动数字囤积行为的重要因素[2]。该研究指出，情感依恋、错失恐惧、人际影响、生活需求和技术进步是影响大学生数字照片囤积行为的五大关键因素。'),
                p('汉斯出版社发表的《当代青年数字囤积行为现状调查与分析》研究表明[5]，89.85%的青年群体通过各类APP软件进行数字内容的收集与保存，呈现出高度的渠道多样化特征。从囤积内容类型来看，新华日报同一调查数据显示[1]，照片以59.0%的占比位居首位，其次是聊天记录（49.3%）和音视频（46.1%）。这一数据分布清晰地揭示了本项目的目标市场——照片（尤其是截图）管理是数字囤积问题的核心痛点，具有最广泛的用户基础。'),
                ...insertChart('chart02_hoarding_content.png', '图1-2 数字囤积内容类型分布', 500, 310),
                p('数字囤积行为背后存在复杂的心理动机机制。新华日报调查揭示[1]，53.3%的受访者将数字囤积视为一种心理安慰，认为「存上就尽在掌握中」；52.4%的受访者希望通过保留数字内容来留住过去的时光；50.0%的受访者出于安全感需求，担心未来可能用到而不愿删除。这些心理特征表明，简单的「一键清理」功能难以从根本上解决数字囤积问题，用户真正需要的是一种既能保留信息又能高效检索的解决方案。'),
                ...insertChart('chart03_psychology_motivation.png', '图1-3 数字囤积行为心理动机分析', 500, 280),
                
                // === 1.1.2 超级App的围墙花园效应（原1.1.1）===
                h3('1.1.2 超级App的围墙花园效应'),
                p('在中国移动互联网生态中，存在一种与欧美市场截然不同的用户行为模式——截图文化。腾讯（微信）、阿里（淘宝/支付宝）、字节跳动（抖音）三大生态之间长期存在链接屏蔽机制，形成了所谓的「围墙花园」效应。根据2021年工信部发布的专项整治行动文件，屏蔽网址链接被列为重点整治问题，工信部新闻发言人赵志国明确指出「互联互通是互联网行业高质量发展的必然选择」。'),
                p('尽管工信部于2021年9月要求各平台解除屏蔽，微信也于同年11月在点对点聊天场景中开放外部链接直接访问，但群聊场景和商品分享仍需使用口令方式，跨平台信息传递的障碍并未完全消除。在这一生态背景下，用户不得不依赖截图作为跨平台信息传递的主要载体。典型场景包括：用户在小红书发现心仪商品后，因无法直接跳转淘宝购买而截图保存商品信息；微信聊天记录中的图片因存储策略设有有效期，用户习惯通过截图保存重要信息以防过期清理。'),
                
                // === 1.1.3 中国AI应用市场规模与增长态势 ===
                h3('1.1.3 中国AI应用市场现状'),
                p('中国移动互联网AI应用市场正经历爆发式增长，为本项目提供了广阔的市场空间。根据QuestMobile发布的《2025年中国AI终端生态发展研究报告》[6]，截至2025年8月，移动端AI应用整体用户规模已达6.45亿，其中互联网及AI科技企业原生APP用户规模达2.77亿，应用内嵌AI功能（In-App AI）用户规模达6.22亿。手机厂商AI助手用户规模更是高达5.29亿，这一数据表明端侧AI能力已成为智能手机的核心竞争力。'),
                p('在细分赛道中，AI信息检索类应用表现尤为亮眼。QuestMobile《2025年8月AI应用行业月度报告》[7]显示，该赛道用户规模达7353万，环比增速高达39%，成为增长最快的黑马赛道。这一趋势与本项目「用一句话找到任何截图」的核心价值主张高度契合，表明用户对智能信息检索能力存在强烈的未满足需求。'),
                ...insertChart('chart01_ai_market_scale.png', '图1-4 2025年中国移动端AI应用用户规模', 500, 300),
                p('从手机出货量来看，工信部数据显示2025年1-9月国内手机出货量累计约2.2亿台（实际2.1965亿台[8]），平均单月出货量约2440万台且保持高速增长。这一庞大的硬件基础为端侧AI应用的普及提供了坚实支撑。'),
                ...insertChart('chart07_genai_trend.png', '图1-5 全球生成式AI智能手机市场占比预测', 500, 280),
                
                // === 1.1.4 政策法规：隐私保护的合规红利 ===
                h3('1.1.4 政策法规与隐私保护机遇'),
                p('《中华人民共和国个人信息保护法》（以下简称PIPL）于2021年11月1日起正式施行，对APP数据处理提出了严格要求[9]。该法明确规定「收集个人信息，应当限于实现处理目的的最小范围，不得过度收集个人信息」，确立了数据最小化的基本原则。违反PIPL的企业将面临最高5000万元人民币或前一年年收入5%的罚款。'),
                p('传统OCR工具将图片上传云端处理的模式，在PIPL框架下面临合规挑战。用户的照片属于个人信息范畴，未经明确同意上传至第三方服务器可能构成违规。相比之下，本项目提出的端云协同架构天然符合PIPL的数据最小化原则：隐私模式下所有数据处理均在设备本地完成，无需向外传输任何数据；增强模式则需要用户主动开启并知情同意，数据处理的选择权完全掌握在用户手中。'),
                
                // === 1.2 项目内容 ===
                h2('1.2 项目内容'),
                p('拾光通过多模态语义理解技术，使用户能够以自然语言描述的方式检索相册中的任意图片，彻底突破传统相册仅能按时间和地点索引的局限。项目的核心价值体现在三个维度。在语义搜索能力方面，用户可通过自然语言描述直接定位目标图片，例如输入「上周的咖啡发票」即可精准找到星巴克小票截图，无需依赖文件名或手动标签。在隐私保护方面，系统默认采用端侧推理模式，所有数据处理均在用户设备本地完成，符合《个人信息保护法》规定的数据最小化原则。在能力扩展方面，当用户面对复杂推理任务时，可主动开启云端增强模式，调用参数量达235B的大模型获得更精准的理解能力。'),
                p('项目名称「拾光」源于对照片价值的深刻理解。照片不仅是视觉信息的载体，更是时光与回忆的凝结。通过向量化和数字化技术，从一个人的相册中可以透视其所经历的人生旅程，这正是「拾光」——拾起时光——的命名由来。'),
                ...insertImage('diagram_core_overall.png', '图1-6 拾光系统总流程图', 520, 380),
                
                // MVP版本启动界面截图
                p('图1-7展示了拾光MVP版本的启动界面设计。界面采用暖色调的记忆泡视觉设计，中央展示品牌Logo和中英文名称「拾光 SeekLight」，下方呈现核心价值主张「用一句话，找到任何截图」和副标语「记忆你的每一刻」，整体设计简洁温暖，传达产品的核心理念。'),
                ...insertScreenshot('mvp_splash.png', '图1-7 拾光MVP版本启动界面', 180, 380),
                
                // === 1.3 目标用户（原文档内容）===
                h2('1.3 目标用户'),
                p('本项目面向三类核心用户群体。第一类是中国大学生群体，该群体因学业压力和信息焦虑而普遍存在截图囤积行为，根据2025年发表于《Frontiers in Psychology》的研究，21.5%的年轻人群体存在病理性数字囤积倾向，这一比例显著高于一般人群的3.7%-6%[10]。第二类是有大量截图管理需求的职场人士，他们需要频繁保存工作相关的票据、合同、聊天记录等信息。第三类是注重隐私保护的用户，他们对将个人照片上传云端处理持谨慎态度，希望在本地完成数据处理。'),
                
                // === 1.4 创新点 ===
                h2('1.4 创新点'),
                h3('1.4.1 技术创新点'),
                
                // 【核心创新1：层次化记忆架构】
                h4('层次化记忆架构'),
                p('层次化记忆架构是本项目区别于所有竞品的核心技术贡献，其设计借鉴了Stanford大学Park等人在UIST 2023发表的Generative Agents研究[4]，构建了短期记忆、长期记忆和隐式记忆的三层认知体系。这一架构使拾光从「存储工具」进化为「生活伙伴」，能够理解「用户经历了什么」而非仅仅「照片是什么」。'),
                p('短期记忆层存储单张图片的即时描述信息，包括VLM生成的语义描述、OCR提取的文字内容、场景分类标签以及384维语义向量。该层是后续高级认知的数据基础，技术成熟度为TRL 7级。'),
                p('长期记忆层是整个架构的核心难点，通过Reflection机制从多张短期记忆中推断高级事实。所谓Reflection，是指系统周期性地回顾近期记忆流，通过模式识别和推理生成更抽象的认知结论。例如，当系统观察到用户连续三天拍摄海滩、椰子树、酒店房间等照片时，Reflection机制可推断出「用户正在三亚旅行」这一高级事实。这一能力使用户可以通过「上次去海边的照片」这样的模糊查询找到相关图片，即使单张照片的描述中并未包含「海边」这一关键词。'),
                p('Reflection机制的工程实现面临三项核心挑战。第一，计算开销控制——本项目采用事件驱动与定时触发相结合的策略，事件驱动条件包括单次导入超过50张图片、检测到地理位置变化超过50公里；定时触发则安排在设备充电且屏幕关闭的空闲时段。第二，推断结果可信度——本项目为每条推断标注置信度分数，当置信度低于0.6的阈值时，该推断被标记为「待验证」状态，不参与用户可见的检索结果。第三，端侧算力适配——通过采用INT4量化的Qwen3-VL-2B模型，单次Reflection推理耗时约8-12秒，在后台执行时不影响用户体验。'),
                p('隐式记忆层通过观察用户行为自动学习场景化偏好，实现「无声的个性化」体验。隐式偏好学习采用指数移动平均（EMA）算法实现渐进式更新，核心公式为Pref_new = α×Edit + (1-α)×Pref_old，其中平滑系数α设为0.2。典型应用场景包括：系统观察到用户在拍摄食物时总是选择暖色调滤镜，在拍摄风景时总是选择高饱和度，这些偏好被自动记录到隐式记忆中。'),
                ...insertMemoryArchChart('diagram_memory_need_mapping.png', '图1-7 用户检索需求与记忆层响应映射', 550, 300),
                
                // 【核心创新2：多层处理管道】
                h4('多层处理管道'),
                p('多层处理管道是第二项技术创新，通过分层处理实现500毫秒内快速响应与3-5秒深度理解的最佳平衡。Layer 1（快速预处理层）在100毫秒内完成二维码检测（ZXing）、场景分类（规则引擎）和快速OCR（Google ML Kit），让用户在截图后立即获得反馈。Layer 2（结构化提取层）在约200毫秒内将非结构化文本转换为可查询的结构化数据，如快递单号、电话号码、金额等。Layer 3（深度理解层）按需触发VLM进行语义分析，通过按需触发而非全量执行控制计算开销。'),
                
                // 【核心创新3：端云协同推理架构】
                h4('端云协同推理架构'),
                p('端云协同推理架构是第三项创新，其设计目标并非追求技术复杂度，而是解决隐私保护与能力需求之间的现实矛盾。隐私模式采用阿里巴巴开源的Qwen3-VL-2B作为端侧模型，通过MNN框架部署到移动端，经INT4量化后模型大小约1.37GB，所有数据处理在设备本地完成。增强模式调用Qwen3-VL-235B云端模型，参数量是端侧模型的117倍，当用户需要处理复杂推理任务时可主动开启。这一架构的创新价值在于「用户主权」设计理念：数据处理方式的选择权完全在用户手中，系统不会在用户不知情的情况下上传任何数据。'),
                
                h3('1.4.2 功能创新点'),
                h4('多模态语义搜索'),
                p('多模态语义搜索是拾光的核心功能创新，其价值主张可以概括为「用一句话，找到任何截图」。该功能将突破传统相册只能按时间和地点索引的限制，使用户能够通过自然语言描述检索相册中的任意图片。'),
                p('典型使用场景涵盖多种日常需求：输入「上周的咖啡发票」可直接定位星巴克小票截图，即使图片文件名为随机字符；输入「红色的裙子」可找到电商商品截图，系统通过理解图片中的视觉特征而非依赖文字标签；输入「和小明的聊天记录」可找到微信聊天截图，系统将理解聊天界面的视觉布局和文字内容进行综合匹配；输入「上次去海边的照片」可关联返回整个旅行事件的所有图片，这得益于长期记忆层的Reflection机制。'),
                p('技术实现流程规划为四个步骤。首先，VLM模型分析图片内容并生成语义描述，涵盖场景、物体、文字、颜色等多维信息。其次，OCR引擎提取图片中的所有文字内容。然后，语义嵌入模型将描述和文字分别转换为语义向量，存入向量数据库。最后，当用户输入查询时，系统将查询转换为向量，通过余弦相似度计算找到最匹配的图片，并结合长期记忆层进行事件聚合。'),
                ...insertMemoryArchChart('diagram_semantic_search_flow.png', '图1-8 多模态语义搜索流程', 550, 300),
                
                h4('隐私保险箱'),
                p('隐私保险箱是「隐私优先」理念的功能载体，与端侧推理共同构成完整的隐私保护方案。端侧推理保护的是「数据不出端」——所有AI处理在设备本地完成；隐私保险箱保护的是「数据不被看见」——防止他人窥探敏感照片。两者结合构成拾光隐私保护的双闭环架构。'),
                p('隐私保险箱规划包含四项核心能力。第一，敏感内容检测——通过VLM推理结合关键词规则，自动识别身份证、银行卡、密码截图、合同文件等敏感内容，检测准确率目标达85%以上。第二，自动隔离加密——检测到的敏感图片自动移入隐私保险箱，采用Android EncryptedFile API进行AES-256-GCM加密存储。第三，生物识别解锁——访问隐私保险箱需通过BiometricPrompt进行指纹或面部验证，支持API 23+设备。第四，主时间线隐藏——隔离的图片不在主相册时间线显示，彻底防止意外暴露。'),
                ...insertMemoryArchChart('diagram_privacy_vault.png', '图1-9 隐私保护双闭环架构', 550, 280),
                
                h3('1.4.3 其他创新点'),
                h4('隐式偏好学习'),
                p('隐式偏好学习是本项目的用户体验创新，无需用户手动设置，系统通过观察用户行为自动学习场景化修图偏好，实现「无声的个性化」体验。与传统的显式偏好设置（如让用户选择喜欢的滤镜风格）不同，隐式偏好学习完全基于用户的自然行为进行推断，降低了使用门槛并提升了个性化精准度。'),
                p('系统规划观察三类用户行为信号：修图历史（用户对不同场景照片选择的滤镜和参数）、浏览时长（用户在特定风格图片上的停留时间）以及收藏行为（用户主动标记喜欢的照片）。通过模式识别，系统可推断出场景化偏好，例如：用户拍摄食物时偏好暖色调滤镜，拍摄风景时偏好高饱和度，拍摄人像时偏好柔和磨皮。'),
                p('偏好更新规划采用指数移动平均（EMA）算法实现渐进式更新，核心公式为Pref_new = α×Edit + (1-α)×Pref_old，其中平滑系数α设为0.2。这一设计既能捕捉用户偏好的渐进演变，又能抵抗偶发行为的噪声干扰，避免单次操作对长期偏好产生过大影响。'),
                ...insertMemoryArchChart('diagram_implicit_pref_learning.png', '图1-10 隐式偏好学习流程', 550, 260),
                
                // ==================== 2 技术方案 ====================
                new Paragraph({ children: [new PageBreak()] }),
                h1('2 技术方案'),
                
                // === 2.1 总体架构 ===
                h2('2.1 总体架构'),
                p('拾光采用「隐私优先、云端增强」的混合推理架构，这是本项目区别于所有竞品的核心技术贡献。该架构的设计借鉴了Google在端侧AI领域的实践经验——Google AI Edge SDK通过在设备本地执行推理，避免了向服务器传输数据，既保护了用户隐私，又支持离线功能。'),
                p('系统整体架构分为四个层次。用户界面层提供自然语言搜索输入、相册浏览、隐私保险箱等交互功能。智能处理层实现多层处理管道、VLM推理引擎和语义向量化。数据存储层管理图片元数据、向量数据库和层次化记忆。系统服务层处理截图监听、Deep Link路由和云端API调用。'),
                ...insertImage('diagram_core_techarch.png', '图2-1 拾光技术架构图（含层次化记忆架构）', 520, 440),
                createTable(['推理模式', '使用模型', '参数量', '部署方式', '响应速度', '适用场景'],
                    [['隐私模式（默认）', 'Qwen3-VL-2B', '2B', 'MNN端侧部署', '约3秒/图', '日常搜索'],
                     ['增强模式（用户开启）', 'Qwen3-VL-235B', '235B', 'SiliconFlow API', '约5秒/图', '复杂推理']],
                    [1600, 1600, 1000, 1600, 1400, 1800]),
                caption('表2-1 端云协同推理模式对比'),
                
                // === 2.2 竞品技术对比分析 ===
                h2('2.2 竞品技术对比分析'),
                h3('2.2.1 国产手机系统相册AI功能现状'),
                p('当前国产手机系统相册均已集成AI识别功能，但普遍存在「识别孤岛」问题——每张图片被独立分析，图片之间缺乏关联理解。以主流手机品牌为例，华为相册提供「精彩瞬间」AI优化、反光消除、路人移除等单图编辑功能；小米相册支持AI消除、AI扩图、自动识别精彩片段；vivo相册提供屏幕识别、AI总结命名、本机相册搜索；OPPO相册支持AI构图、去拖影、无痕消除等功能。'),
                p('然而，上述方案均采用「单图独立处理」模式，本质上仍是基于OCR和物体识别的简单分析。当用户搜索「上次去海边的照片」时，系统只能逐张匹配包含「海边」关键词的图片，无法理解用户指的是某次旅行经历。更关键的是，这些方案与特定手机品牌深度绑定——华为用户换成小米后，之前积累的智能标签和使用习惯将全部丢失，这是用户体验的重大断裂点。'),
                
                h3('2.2.2 现有方案的技术局限性'),
                p('对现有手机系统相册进行技术分析后，可以归纳出三个共性局限。'),
                p('第一，基于孤立图片的简单分析。无论是华为的「精彩瞬间」还是vivo的「蓝心小V」，其AI能力均局限于单张图片范围内的识别和处理。系统可以识别「这是一张海滩照片」，但无法推断「用户上周进行了一次三亚旅行」。这种孤立分析模式导致用户难以通过模糊描述（如「上次出差时拍的」）找到目标图片。'),
                p('第二，OCR主导的文字提取。当前手机相册的「智能搜索」功能主要依赖OCR文字识别，本质上是关键词匹配而非语义理解。用户搜索「咖啡发票」时，系统只能匹配图片中包含「咖啡」或「发票」文字的截图，无法理解星巴克小票也属于咖啡发票的范畴。'),
                p('第三，品牌锁定与数据孤岛。每个手机厂商的AI相册功能均为封闭生态，用户在A品牌手机上积累的AI分析结果无法迁移到B品牌。据统计，中国用户平均换机周期为2-3年，这意味着每次换机都可能面临智能相册体验的「归零」。'),
                ...insertV6Chart('chart_system_album_comparison.png', '图2-2 国产手机系统相册AI功能对比', 540, 320),
                
                h3('2.2.3 拾光的差异化定位'),
                p('针对上述局限，拾光提出三项核心差异化能力。'),
                p('第一，从「识别单图」到「理解经历」。借鉴Stanford大学Generative Agents研究的Reflection机制，拾光构建了短期记忆、长期记忆和隐式记忆的三层体系。系统不仅记录「这张图片是什么」，更能推断「用户最近在做什么」。当用户连续拍摄机票、酒店、景点照片时，系统可自动推断「用户正在旅行」，后续用户搜索「上次旅行」即可关联返回全部相关图片。'),
                p('第二，从「关键词匹配」到「语义理解」。拾光采用视觉语言模型（VLM）生成图片的语义描述，再通过向量化技术实现语义级检索。用户搜索「咖啡发票」时，系统能够理解星巴克、瑞幸、Manner等品牌的小票都属于咖啡发票，即使图片中不包含「咖啡」二字。'),
                p('第三，跨品牌数据可迁移。拾光作为独立应用，不依赖特定手机品牌，用户换机时数据和使用习惯可完整保留。无论从华为换到小米，还是从OPPO换到vivo，拾光积累的语义索引和用户偏好均可无缝延续。'),
                ...insertV6Chart('chart_memory_vs_ocr.png', '图2-3 传统OCR方案与层次化记忆架构对比', 540, 300),
                
                // === 2.3 功能详述（原文档完整内容）===
                h2('2.3 功能详述'),
                h3('2.3.1 多模态语义搜索'),
                p('多模态语义搜索是拾光的核心功能，其价值主张可以概括为「用一句话，找到任何截图」。该功能突破了传统相册只能按时间和地点索引的限制，使用户能够通过自然语言描述检索相册中的任意图片。'),
                p('典型使用场景包括：输入「上周的咖啡发票」可直接找到星巴克小票截图，即使图片文件名为随机字符；输入「红色的裙子」可找到电商截图，即使图片中没有出现「红色」这一文字；输入「和小明的聊天记录」可找到微信聊天截图，系统通过理解聊天界面的视觉特征和文字内容进行匹配。'),
                p('技术实现流程包含四个步骤。首先，VLM模型分析图片内容并生成语义描述，该描述涵盖场景、物体、文字、颜色等多维信息。其次，OCR引擎提取图片中的所有文字内容。然后，MiniLM-L6-v2模型将描述和文字分别转换为384维语义向量，并存入向量数据库。最后，当用户输入查询时，系统同样将查询转换为向量，通过余弦相似度计算找到最匹配的图片。'),
                ...insertImage('diagram_core_dataflow.png', '图2-4 拾光系统数据流图', 520, 395),
                
                // MVP版本主界面截图展示（双栏并行）
                p('图2-4a和图2-4b展示了拾光MVP版本的主界面设计。左图为空闲状态，用户可通过点击上传区域选择图片，界面顶部显示AI就绪状态和导航入口；右图为AI分析完成状态，展示了VLM推理的性能指标和生成的图片语义描述结果。'),
                ...insertDualScreenshots('mvp_main_idle.png', '图2-4a 空闲状态', 'mvp_main_result.png', '图2-4b AI分析完成', 150, 320),
                
                createTable(['搜索模式', '理解能力', '隐私保护', '适用场景'],
                    [['隐私模式', '基础语义理解', '完全离线，数据不出端', '日常搜索、隐私敏感图片'],
                     ['增强模式', '复杂推理、细节理解', '数据上云，需用户同意', '精确搜索、批量导入']],
                    [2200, 2500, 2500, 2800]),
                caption('表2-2 搜索模式对比'),
                
                h3('2.3.2 快速内容识别'),
                p('快速内容识别子系统的设计目标是在500毫秒内完成图片预处理，为用户提供即时反馈。该子系统由三个核心组件构成。'),
                p('快速OCR组件采用Google ML Kit Text Recognition引擎，该引擎专为移动端优化，能在200毫秒内完成中英文混合文本的识别。与VLM OCR（耗时3-5秒）相比，ML Kit在速度上具有显著优势，非常适合截图监听时的即时反馈场景。两者形成互补关系：ML Kit负责「快速响应」，VLM负责「深度理解」。'),
                p('二维码识别组件采用成熟的开源方案ZXing，支持QR Code、EAN、UPC等多种格式，识别延迟控制在100毫秒以内。识别结果会自动分类为URL、文本或名片等类型。典型应用场景包括识别快递二维码并提取单号、识别支付二维码并提示安全风险、识别名片二维码并提取联系方式等。'),
                p('场景分类组件采用「规则优先+启发式兜底」的策略，自动将截图分类为不同场景标签。分类规则包括：检测到价格符号（¥/￥）配合商品图即标记为电商类（如淘宝截图）；检测到聊天气泡UI即标记为聊天类（如微信记录）；检测到金额、日期、交易关键词的组合即标记为票据类（如支付宝账单）；ZXing检测成功即标记为二维码类；大段文字配合少量图像标记为文档类（如PPT截图）；其余默认归为照片类。该规则引擎延迟极低（<50ms），为后续智能建议提供即时上下文。'),
                
                h3('2.3.3 结构化信息提取'),
                p('在快速OCR的基础上，系统内置正则表达式引擎，将非结构化文本转换为可查询的结构化数据。提取类型涵盖价格（如¥299.00）、日期（如2026-01-28）、快递单号（如SF开头的12位编码）、手机号（1开头的11位数字）以及URL链接等。'),
                p('结构化信息的提取使用户能够进行更精确的检索。例如，用户可直接搜索「顺丰快递」或「299元」，系统将精确定位到包含相应结构化信息的截图，而非进行模糊匹配。这一功能对于票据管理、快递追踪等高频场景具有重要价值。'),
                
                // MVP版本标签管理界面截图
                p('图2-4c展示了拾光MVP版本的标签管理界面。系统自动从AI生成的图片描述中提取标签并进行分类管理，当前已积累194个标签，按「人物」「地点」「物品」「活动」四个维度进行组织。用户可通过搜索框快速定位标签，每个标签显示关联的记忆数量，支持一键删除冗余标签。'),
                ...insertScreenshot('mvp_tag_management.png', '图2-4c MVP版本标签管理界面', 180, 380),
                
                h3('2.3.4 跨应用智能跳转'),
                p('拾光不仅是信息检索的终点，更是服务触达的起点。当系统检测到特定内容时，会通过Deep Link技术提供一键跳转到目标App的能力。'),
                p('典型场景包括：截图一件商品后，系统提示「去淘宝搜索」或「去京东比价」；截图英文菜单后，提示「用有道翻译」；截图地址信息后，提示「用高德导航」。系统已预置淘宝、京东、拼多多、有道词典、高德地图等主流应用的Deep Link协议。如果目标App未安装，系统会自动降级到对应的Web URL，确保服务的连续性。'),
                
                h3('2.3.5 隐私保险箱'),
                p('隐私保险箱是「隐私优先」理念的功能载体，与端侧推理共同构成完整的隐私保护方案。该功能的设计理念可以概括为：端侧推理保护的是「数据不出端」，隐私保险箱保护的是「数据不被看见」，两者结合构成拾光隐私保护的完整闭环。'),
                p('核心能力包括四个方面。敏感内容检测功能可自动识别身份证、银行卡、私密照片等敏感内容。自动隔离功能在检测到敏感图片后，自动将其移入加密文件夹。生物识别解锁功能要求通过指纹或面部识别才能查看保险箱内容。主时间线隐藏功能确保敏感图片不会出现在相册主界面，防止在他人面前展示照片时泄露隐私。'),
                p('技术实现层面，敏感内容检测采用VLM推理结合关键词规则；加密存储采用Android EncryptedFile API；生物识别采用BiometricPrompt API。'),
                
                // === 2.4 关键技术（原文档+扩充）===
                h2('2.4 关键技术'),
                h3('2.4.1 多层处理管道'),
                p('为了兼顾响应速度与理解深度，拾光采用分层处理架构。该设计使用户截图后能在500毫秒内获得即时反馈，同时保留VLM深度理解能力以应对复杂场景。'),
                p('Layer 1（快速预处理层）在100毫秒内完成三项任务：二维码检测采用成熟的开源方案ZXing，支持QR Code、EAN、UPC等多种格式；场景分类采用规则引擎结合启发式算法，延迟控制在50毫秒以内；快速OCR采用Google ML Kit Text Recognition，专为移动端优化，能在200毫秒内完成中英文混合文本识别。'),
                p('Layer 2（结构化提取层）在约200毫秒内将非结构化文本转换为可查询的结构化数据。系统内置正则表达式引擎，可自动提取价格（如¥299.00）、日期（如2026-01-28）、快递单号（如SF开头的12位编码）、手机号（1开头的11位数字）以及URL链接等信息。'),
                p('Layer 3（深度理解层）按需触发VLM进行语义分析，耗时3-5秒。该层负责生成图片的语义描述，并通过MiniLM-L6-v2模型将描述转换为384维语义向量存入向量数据库，为后续的语义搜索提供支持。'),
                
                h3('2.4.2 层次化记忆架构'),
                p('当前智能相册的一个普遍局限在于仅能存储「低级事实」——即单张图片的描述和标签，而无法形成对用户生活的深层理解。本项目借鉴Stanford大学Generative Agents研究中的Reflection机制[4]以及最新的层次化记忆架构研究[11]，构建了三层记忆体系，实现从低级观察到高级洞察的认知跃升。'),
                h4('短期记忆（ImageMemory）'),
                p('短期记忆存储单张图片的即时描述信息，包括VLM生成的语义描述、OCR提取的文字内容、场景分类标签以及结构化信息（价格、日期、电话等）。这是最细粒度的记忆单元，对应认知科学中的「情景记忆」（Episodic Memory）。'),
                h4('长期记忆（HighLevelFact）'),
                p('长期记忆通过Reflection机制从多张短期记忆中推断高级事实。系统定期执行反思过程，分析近期图片的模式和关联，生成跨图片的高层洞察。例如，当系统检测到连续多天出现海滩、酒店、美食、景点等照片，且GPS定位显示用户离开常住城市时，将推断出「用户正在三亚旅行」这一高级事实。'),
                h4('隐式记忆（UserPreference）'),
                p('隐式记忆存储用户的行为偏好，通过观察用户的交互模式自动学习。例如，系统可学习到「用户拍美食时偏好暖色调滤镜」、「用户拍风景时偏好HDR效果」等场景化偏好，从而提供个性化的修图建议。'),
                
                h3('2.4.3 向量检索算法'),
                p('本项目的语义搜索功能依赖高效的向量检索技术。系统采用MiniLM-L6-v2模型将图片描述和用户查询转换为384维的语义向量，并通过余弦相似度计算进行匹配。给定图片语义向量v和查询语义向量q，两者的相似度计算公式为：sim(v,q) = (v·q)/(||v||×||q||)，相似度值域为[-1,1]，值越接近1表示语义越相似。'),
                ...insertChart('chart05_cosine_similarity.png', '图2-5 语义向量余弦相似度计算', 520, 300),
                
                h4('HNSW索引算法原理'),
                p('HNSW（Hierarchical Navigable Small World）是目前工业界最先进的近似最近邻搜索算法之一，由Malkov与Yashunin于2016年提出[12]。该算法构建了一个多层次的图结构，其核心思想是将Skip List的层次化思想与Navigable Small World图的近邻连接特性相结合。在HNSW结构中，最底层（Layer 0）包含所有数据节点，每个节点与其邻近节点建立连接；越往上的层级包含的节点越少，但节点间的连接跨度越大。检索时，算法从最高层的入口点出发，通过贪婪搜索找到当前层最近的节点，然后下降到下一层继续搜索，最终在最底层进行精细搜索。这种层次化结构使得搜索复杂度从O(n)降低到O(log n)。'),
                p('本项目采用ObjectBox数据库内置的HNSW索引[13]，关键配置参数如下：M参数（最大连接数）设为16，平衡召回率和内存占用；ef_construction（构建时搜索宽度）设为200，确保索引质量；ef_search（检索时搜索宽度）设为100，平衡检索速度与召回率；距离度量采用余弦相似度。根据HNSW原论文[12]及ANN-Benchmarks公开测试数据，在10万条384维向量数据集上，HNSW预计可在10-20ms内完成Top-10检索，召回率达90%以上，相比暴力搜索性能提升数十倍。'),
                ...insertV6Chart('chart_hnsw_structure.png', '图2-5 HNSW分层可导航小世界图索引结构', 540, 330),
                
                // MVP版本语义搜索界面截图
                p('图2-5a展示了拾光MVP版本的记忆库搜索界面。用户在搜索框输入「狗」进行语义搜索，系统提供三种搜索模式：关键词匹配、语义向量检索和混合模式。当前选择混合模式，仅用80ms即完成检索，返回2条匹配结果。搜索结果以卡片形式展示，包含图片缩略图、AI生成的描述摘要和Token数，用户可点击查看详情。'),
                ...insertScreenshot('mvp_search.png', '图2-5a MVP版本语义搜索界面（80ms检索）', 180, 380),
                
                h4('PQ乘积量化压缩'),
                p('PQ（Product Quantization，乘积量化）是一种面向大规模向量数据的有损压缩算法，由Jégou等人于2011年提出[14]。其核心思想是将高维向量分割成多个低维子向量，然后对每个子空间独立进行聚类量化。具体而言，384维向量被分割为M=48个8维子向量，每个子空间通过K-Means聚类生成256个聚类中心（码本）。原始向量被编码为48个8-bit索引，存储空间从384×4=1536字节压缩至48字节，压缩率达32:1。'),
                p('距离计算采用ADC（Asymmetric Distance Computation）方法：查询向量与码本中心的距离被预计算为查找表，每次距离计算只需48次查表和加法操作，计算复杂度从384次乘法降低到48次加法。在拾光中的应用效果如下：原始存储需求为10万张图片×1536字节=146MB，压缩后需求为10万张图片×48字节=4.6MB。根据PQ原论文[14]及Elastic Labs测试报告，32倍压缩率下召回率损失约为4-6%（可接受范围）。该压缩方案使得万级图片的语义向量可以完全加载到内存中，避免磁盘I/O成为检索瓶颈。'),
                ...insertV6Chart('chart_pq_compression_v2.png', '图2-6 PQ乘积量化压缩原理与效果', 540, 290),
                
                h3('2.4.4 双塔融合检索架构'),
                p('本项目设计了双塔融合检索架构，实现文本理解与视觉理解的协同工作。视觉理解塔通过VLM生成图片的语义描述，涵盖场景、物体、文字、颜色等多维信息；文本理解塔通过快速OCR提取图片中的所有文字内容。两个塔的输出均经过MiniLM-L6-v2模型转换为384维语义向量。'),
                p('检索时，系统采用混合评分机制，综合考虑三个因素：语义相似度（通过余弦距离计算查询向量与图片向量的匹配程度）、关键词匹配（对结构化信息进行精确匹配）、时间衰减（近期图片获得适当加权）。最终评分公式为：Score = α×语义相似度 + β×关键词匹配度 + γ×时间权重。'),
                
                h3('2.4.5 Reflection机制移动端适配'),
                p('将Stanford大学Park等人在《Generative Agents: Interactive Simulacra of Human Behavior》论文中提出的Reflection机制适配到移动端是本项目的技术创新之一[4]。原始论文中的Reflection机制运行在高性能服务器上，移动端适配需要解决计算资源受限、电池续航敏感、用户体验要求高等多重约束。Reflection的核心价值在于：将分散的低级事实聚合为高级事实，使系统具备「事件级别」的认知能力。'),
                
                h4('计算开销控制'),
                p('原版Generative Agents在云端GPT-4上运行，单次Reflection需要数秒响应时间。本项目采用事件驱动+定时触发的混合策略。事件驱动条件包括：单次导入超过50张图片、地理位置变化超过50公里、连续图片场景信息熵低于0.5。定时触发时机安排在设备充电状态、屏幕关闭、凌晨2:00-5:00空闲时段。执行框架采用Android WorkManager的PeriodicWorkRequest，设置约束条件NetworkType.UNMETERED和BatteryNotLow。'),
                
                h4('推断结果可信度'),
                p('高级事实推断存在误判风险。本项目为每条推断标注置信度分数，计算公式为：Confidence = 1/(1+exp(-(w1×N_evidence + w2×S_strength + w3×T_span)))。其中N_evidence为支撑证据数量（关联图片数），S_strength为证据强度（场景相关性得分），T_span为时间跨度因子，权重w1=0.4, w2=0.35, w3=0.25通过小规模标注数据调优。当置信度低于0.6时，推断标记为「待验证」状态，不参与用户可见结果。'),
                ...insertChart('chart08_confidence_calc.png', '图2-7 高级事实置信度评估机制', 520, 290),
                
                h4('端侧算力适配'),
                p('采用INT4量化的Qwen3-VL-2B模型执行Reflection推理。单次推理耗时8-12秒，在后台执行不影响用户体验。提示词模板设计为结构化指令格式，要求模型分析图片描述序列并推断用户可能正在经历的事件或活动，输出格式包含高级事实描述和置信度评分。'),
                ...insertV6Chart('chart_reflection_challenges.png', '图2-8 Reflection机制移动端适配三项挑战', 540, 260),
                
                // === 2.5 其他相关技术 ===
                h2('2.5 其他相关技术'),
                h3('2.5.1 硬件与系统支撑'),
                p('在硬件层面，本项目依托当代旗舰移动平台的高性能NPU，包括高通骁龙8 Gen 3/4和联发科天玑9300/9400。通过INT4量化技术，2B参数模型可压缩至约1.37GB，实测在骁龙8 Gen 3平台上首Token延迟约3224毫秒，解码速度达到14.0 tokens/s。'),
                p('在系统层面，截图感知功能利用Android 14引入的Screenshot Detection API（Activity.ScreenCaptureCallback）实现实时监听；针对Android 13及以下版本，采用ContentObserver监听MediaStore的兼容方案。媒体库访问遵循Scoped Storage规范，仅请求必要的媒体库权限，符合Android隐私规范要求。'),
                createTable(['功能模块', '目标延迟', '技术实现', '参考依据', '当前状态'],
                    [['二维码识别', '~150ms', 'ZXing开源库', '社区基准测试[15]', '规划中'],
                     ['场景分类', '<50ms', '规则引擎+启发式', '技术方案设计', '规划中'],
                     ['快速OCR', '实时', 'Google ML Kit', 'Google官方文档[16]', '规划中'],
                     ['结构化提取', '<200ms', '正则表达式引擎', '技术方案设计', '规划中'],
                     ['端到端预处理', '<500ms', 'Layer 1 + Layer 2', '技术方案设计', '规划中'],
                     ['VLM深度理解', '~3s首Token', 'Qwen3-VL（端/云）', '团队实测验证', '原型验证'],
                     ['语义搜索', '10-20ms', 'MiniLM + HNSW', 'ANN-Benchmarks[12]', '原型验证']],
                    [2000, 1500, 2000, 2200, 1500]),
                caption('表2-3 性能指标与技术选型'),
                
                // 端云协同推理模式图
                ...insertV6Chart('chart_inference_mode.png', '图2-9 端云协同推理模式决策流程', 540, 290),
                
                h3('2.5.2 安全与隐私保护'),
                p('本项目处理的核心资产是用户的照片和截图数据，其中可能包含身份证件、银行卡信息、私密对话、个人行踪等高度敏感内容。因此，系统性的威胁建模和风险识别是产品设计的首要任务。'),
                p('在数据泄露威胁方面，主要风险来源包括网络传输过程中的中间人攻击、云端存储服务器的入侵、本地存储介质的物理窃取以及恶意应用的数据窃取。针对这些威胁，本项目采取了分层防护策略：隐私模式下所有数据处理完全在设备本地完成，从根本上消除了网络传输和云端存储的攻击面；增强模式下的云端通信采用TLS 1.3加密；本地存储采用Android EncryptedFile API实现AES-256加密保护。'),
                p('《中华人民共和国个人信息保护法》对APP数据处理提出了严格的合规要求，本项目的架构设计充分考虑了这些法规约束。在数据最小化原则方面，《个人信息保护法》第六条明确规定[9]「收集个人信息，应当限于实现处理目的的最小范围，不得过度收集个人信息」。本项目的端侧优先架构完美契合这一原则：隐私模式下所有数据处理在设备本地完成，无需向外传输任何数据。'),
                ...insertImage('diagram10_privacy.png', '图2-8 隐私保护双闭环架构', 480, 300),
                
                // ==================== 3 项目计划 ====================
                new Paragraph({ children: [new PageBreak()] }),
                h1('3 项目计划'),
                
                // === 3.1 可行性分析 ===
                h2('3.1 可行性分析'),
                h3('3.1.1 技术可行性分析'),
                p('端侧VLM部署是本项目的技术基石，其可行性已通过原型验证得到确认。当前原型采用Qwen3-VL-2B-Instruct模型（MNN格式），实测首Token延迟为3224ms，解码速度达到14.0 tokens/s，模型大小约1.37GB（INT4量化），内存要求≥4GB RAM。技术成熟度已达到TRL 7级（系统原型在实际环境验证）。'),
                p('端云协同推理架构的可行性已在项目技术设计阶段完成详细论证。核心设计决策包括：推理路由策略采用隐私模式强制端侧、非隐私模式云端优先；失败回退机制设定云端推理最多3次重试，总时限0.8秒，超时自动回退端侧。技术成熟度达到TRL 5级。'),
                p('多层处理管道已完成详细设计，关键组件均有成熟开源方案。快速OCR采用Google ML Kit（生产就绪），二维码识别采用ZXing（生产就绪），场景分类采用规则引擎（原型验证），结构化提取采用正则表达式（生产就绪）。技术成熟度达到TRL 4级。'),
                p('层次化记忆与Reflection机制借鉴Stanford大学Generative Agents研究[4]，该机制已在学术界得到广泛验证。移动端适配采用事件驱动+定时触发策略控制计算开销，复用已验证的端侧VLM进行Reflection推理。技术成熟度达到TRL 3级。'),
                createTable(['技术模块', 'TRL等级', '可行性评估', '开发周期'],
                    [['端侧VLM部署', 'TRL 7', '原型验证', '基本完成'],
                     ['端云协同推理', 'TRL 5', '高度可行', '2周'],
                     ['多层处理管道', 'TRL 4', '高度可行', '2周'],
                     ['层次化记忆', 'TRL 3', '可行（需原型验证）', '3-4周'],
                     ['隐式偏好学习', 'TRL 3', '可行（需原型验证）', '2-3周']],
                    [2500, 1500, 2500, 2500]),
                caption('表3-1 技术成熟度评估'),
                ...insertImage('diagram03_radar_trl.png', '图3-1 技术成熟度雷达图', 480, 360),
                
                // === 功能实现可行性分析（新增论证）===
                h3('3.1.2 功能实现可行性分析'),
                p('上述技术模块的成熟度评估聚焦于底层技术栈，而功能实现可行性分析则从用户可感知的功能层面出发，论证"为什么这些功能可以实现"。功能可行性评估遵循"需求-能力-风险"三位一体的分析框架：需求维度明确功能的核心技术挑战，能力维度论证现有技术方案的成熟度和适配性，风险维度识别潜在障碍并提出应对策略。'),
                ...insertFeasibilityChart('chart_func_tech_mapping.png', '图3-2 功能需求与技术实现映射关系', 520, 380),
                
                p('多模态语义搜索功能的实现依赖三项关键技术能力的协同工作：视觉语言理解、语义向量化和高效检索。在视觉语言理解方面，本项目采用的Qwen3-VL-2B模型已在原型阶段完成可行性验证，测试数据显示首Token延迟约3秒、解码速度约14 tokens/s，表明端侧VLM能够在可接受的时间窗口内完成图片理解任务。在语义向量化方面，系统采用MiniLM-L6-v2模型将文本描述转换为384维语义向量，该模型大小仅80MB，在移动设备上推理延迟约100ms，已在生产环境中广泛应用，技术成熟度达到TRL 9级。在高效检索方面，HNSW算法的可行性已得到学术界和工业界的双重验证，ObjectBox 4.0于2024年5月发布，在Android平台原生提供HNSW向量数据库支持，官方文档声明可在数百万条目中支持毫秒级检索[13]。综合上述分析，多模态语义搜索功能的技术可行性评估为"高度可行"，三项关键技术的成熟度均达到TRL 7级以上。'),
                
                p('快速内容识别功能要求在500毫秒内完成图片预处理，包括二维码识别、快速OCR和场景分类三项能力。在二维码识别方面，ZXing作为开源二维码识别库已有超过15年的发展历史，首次解码延迟约150毫秒，后续解码延迟可缩短至约75毫秒[15]，远优于时间约束。在快速OCR方面，Google ML Kit Text Recognition V2 API专为移动端优化，支持中文、日文、韩文等多种文字系统，具备「实时识别能力」[16]，技术成熟度为TRL 9级。需要注意的是ML Kit依赖Google Play服务，对于未预装Google服务的国产手机，系统将自动降级到VLM OCR模式。在场景分类方面，本项目采用"规则优先+启发式兜底"的轻量级策略，预计延迟控制在50毫秒以内。各组件的累计延迟预计约325毫秒，留有充足的性能余量，技术可行性评估为"高度可行"。'),
                ...insertFeasibilityChart('chart_timing_analysis.png', '图3-3 快速内容识别时序分析（500ms约束）', 520, 290),
                
                p('跨应用智能跳转功能规划通过Deep Link技术实现。从平台支持角度而言，Android自API 21起即支持Deep Link机制，在Android 6.0中引入App Links支持无歧义的应用关联，Android 15进一步引入动态App Links允许细粒度控制URL匹配行为[17]。从应用生态角度而言，国内主流电商和工具类App均已开放Deep Link协议，本项目规划通过维护协议映射表支持淘宝、京东、拼多多、有道词典、高德地图等主流应用的跳转。从实现复杂度角度而言，Deep Link调用本质上是构造Intent并启动Activity的标准Android操作，代码实现约50行，无外部库依赖。技术可行性评估为"完全可行"。'),
                
                p('隐私保险箱功能要求实现敏感内容检测、加密存储和生物识别解锁三项能力。在敏感内容检测方面，系统采用VLM推理结合关键词规则的混合策略，检测准确率预计可达85%以上。在加密存储方面，Android Jetpack Security库提供EncryptedFile API，采用AES256-GCM加密方案[18]，密钥通过Android Keystore系统安全管理。在生物识别方面，Android BiometricPrompt API自API 28起可用并通过androidx向下兼容至API 23[19]，支持指纹、面部和虹膜等多种生物特征。各组件技术成熟度均在TRL 8级以上，技术可行性评估为"高度可行"。'),
                
                // === 层次化记忆架构可行性分析（核心创新）===
                h4('层次化记忆架构可行性分析'),
                p('层次化记忆架构是本项目区别于所有竞品的核心认知创新，其实现借鉴了Stanford大学Generative Agents研究中的Reflection机制[4]，构建短期记忆、长期记忆和隐式记忆三层体系。该架构的技术可行性分析需要结合具体的开源实现和工程实践进行论证。'),
                ...insertMemoryArchChart('chart_memory_layers.png', '图3-4 层次化记忆架构三层体系', 550, 400),
                
                p('在短期记忆层面，该层存储单张图片的即时描述信息，包括VLM生成的语义描述、OCR提取的文字内容、场景分类标签以及384维语义向量。数据结构采用Room框架管理SQLite数据库，结合ObjectBox 4.0原生HNSW向量索引支持毫秒级语义检索。该层复用已验证的端侧VLM推理和向量存储能力，技术成熟度为TRL 7级，不存在额外技术挑战。'),
                ...insertMemoryArchChart('diagram_imagememory_model.png', '图3-5 短期记忆层数据模型', 500, 240),
                
                p('在长期记忆层面，该层通过Reflection机制从多张短期记忆中推断高级事实，是整个架构的技术难点。从开源实现角度而言，Stanford大学官方开源的generative_agents仓库（GitHub 20.3k stars）[20]提供了完整的Reflection机制参考实现，包含记忆流和反思的核心逻辑。Native-LLM-for-Android项目[21]已验证Qwen3-VL-2B在Android设备上的可行性，其性能基准测试显示在骁龙8 Gen2 CPU上QwenVL-2-2B推理速度可达15 tokens/s。本项目采用事件驱动与定时触发相结合的策略控制计算开销：Reflection触发条件包括单次导入超过50张图片、地理位置显著变化超过50公里、或连续图片场景信息熵低于0.5。定时触发安排在设备充电且屏幕关闭的空闲时段，利用Android WorkManager的后台执行窗口。推断结果采用置信度评分机制进行筛选，置信度低于0.6的推断标记为"待验证"而不直接呈现给用户。'),
                ...insertMemoryArchChart('diagram_reflection_flow.png', '图3-6 Reflection机制执行流程', 560, 320),
                
                p('在隐式记忆层面，该层通过观察用户行为自动学习场景化偏好。用户偏好学习领域已有成熟的理论框架和生产实践，Google提供的TensorFlow Lite + Firebase端侧推荐系统Codelab[22]展示了完整的移动端偏好学习技术栈。本项目采用简化的工程实现路径，基于指数移动平均（EMA）算法实现偏好的渐进式更新。该方案的核心公式为Pref_new = α×Edit + (1-α)×Pref_old，其中平滑系数α设为0.2，新数据获得20%权重而历史偏好保留80%权重。该实现路径复杂度较低，主要依赖Room数据库和简单的统计计算，无需引入额外的机器学习组件。'),
                ...insertMemoryArchChart('diagram_preference_ema.png', '图3-7 隐式记忆层偏好学习机制', 530, 280),
                
                p('层次化记忆架构的开源组件依赖关系如图所示，本项目复用了generative_agents的架构设计思路、Native-LLM-for-Android的端侧VLM推理能力、MNN-LLM的Tokenizer实现以及ObjectBox的向量数据库支持。这些开源组件均处于活跃维护状态，为项目实施提供了坚实的技术基础。'),
                ...insertMemoryArchChart('chart_dependencies.png', '图3-8 层次化记忆架构开源组件依赖', 530, 310),
                
                ...insertMemoryArchChart('chart_trl_table.png', '图3-9 核心功能技术成熟度评估', 530, 300),
                
                p('综合上述逐项分析，本项目七项核心功能模块的技术可行性均达到"可行"以上等级。其中跨应用智能跳转、快速内容识别、隐私保险箱三项功能的关键技术成熟度在TRL 8级以上，可在Phase 2-3快速实现。多模态语义搜索和短期记忆层成熟度为TRL 7级，可与上述功能同步开发。长期记忆层（含Reflection机制）成熟度为TRL 4级，隐式记忆层成熟度为TRL 3级，均需要在Phase 4进行集中原型验证。'),
                
                p('主要风险点及应对策略如图所示。中风险项包括Reflection计算开销、高级事实推断准确率和VLM语义理解准确率，分别通过动态触发阈值、置信度过滤和云端增强模式进行应对。低风险项包括ML Kit服务依赖、偏好学习冷启动和EncryptedFile API弃用，均已设计成熟的降级或替代方案。这些风险均为可控的工程挑战，不影响项目整体可行性。'),
                ...insertMemoryArchChart('chart_risk_cards.png', '图3-10 技术风险识别与应对策略', 560, 210),
                
                p('在硬件资源方面，端侧VLM对硬件有一定要求，但覆盖范围正在快速扩大。当前方案的最低配置为4GB RAM，可覆盖2020年后发布的绝大多数中高端Android设备。根据IDC预测，2028年生成式AI智能手机将占据全球市场70%份额，端侧AI算力将成为标配。'),
                p('在团队资源方面，基于四人团队配置进行分工：成员A负责算法研究（端侧VLM优化、Reflection机制、隐式偏好学习算法），成员B负责系统架构（多层处理管道、向量数据库、端云协同调度），成员C负责移动端开发（Android UI/UX实现、截图监听、Deep Link集成），成员D负责产品运营（UI设计、演示视频、答辩PPT、市场调研与文档撰写）。'),
                createTable(['硬件平台', '预期性能', '数据来源', '市场覆盖'],
                    [['骁龙8 Gen 3/4', '首Token ~3s, 14 tok/s', '团队实测验证', '旗舰机型'],
                     ['骁龙8 Gen 2', '15 tok/s', 'Native-LLM-for-Android[21]', '次旗舰机型'],
                     ['骁龙7+ Gen 3', '首Token 4-5s, 10+ tok/s', '性能预估', '中高端机型'],
                     ['天玑9300/9400', '首Token <3s, 14+ tok/s', '性能预估', '旗舰机型'],
                     ['4GB RAM设备', '首Token 5-8s, 8+ tok/s', '性能预估', '2020+中端机型']],
                    [2500, 2500, 2500, 2000]),
                caption('表3-2 硬件兼容性分析'),
                
                h3('3.1.4 市场可行性分析'),
                p('本节聚焦于「能不能做成功」的商业分析，与项目背景（1.1节）的痛点分析形成互补。'),
                
                h4('目标市场规模'),
                p('中国AI应用市场整体呈现爆发式增长态势。根据QuestMobile 2025年9月报告[23]，中国移动端AI应用月活跃用户达7.29亿，较2024年同期增长超过60%。在图片编辑与相册管理细分领域，美图公司2025年中期业绩公告[24]显示：付费订阅用户数达1540万，同比增长42%（超42%）；付费渗透率达5.5%；影像与设计产品业务收入13.5亿元，同比增长45.2%。这一数据验证了图片类应用的付费订阅模式在中国市场的可行性。'),
                p('市场规模估算采用TAM/SAM/SOM模型：TAM（总可寻址市场）为中国有图片管理需求的智能手机用户，约6亿人；SAM（可服务市场）为对隐私保护有较高要求且愿意付费的中高端用户，约8000万人；SOM（可获得市场）为项目第一年目标用户，以大学生和年轻白领为主，目标100万下载量、10万付费用户。'),
                ...insertV6Chart('chart_market_tam_sam_som.png', '图3-13 目标市场规模估算（TAM/SAM/SOM模型）', 540, 290),
                
                h4('目标用户付费意愿'),
                p('大学生群体是本项目的核心种子用户。根据第一财经2024年调研报告[25]：55.47%的大学生愿意为APP付费订阅会员，音视频类APP消费占比64.47%位居首位。中国在校大学生数量4763万人（教育部2023年统计），超60%大学生日均使用手机5小时以上（第一财经调研数据）。隐私保护方面，根据2025年中国公众AI使用调研[26]，46.7%的公众将隐私泄露列为AI的主要负面影响，这一数据支撑了本项目「端侧优先」定位的市场必要性。'),
                
                h4('竞品定价参考'),
                p('国际主流云相册服务定价如下：Google One基础套餐$1.99/月（100GB），高级套餐$9.99/月（2TB）（Google One官网2025年定价）；iCloud+基础套餐$0.99/月（50GB），高级套餐$9.99/月（2TB）（Apple官网2025年定价）；美图VIP连续包月¥20，年费¥168（美图秀秀官网2025年定价[27]）。本项目定价策略参考美图，采用¥12/月或¥98/年的价格区间，低于国际竞品以适应中国市场消费习惯。'),
                ...insertV6Chart('chart_pricing_comparison.png', '图3-14 竞品定价对比与拾光定价策略', 540, 240),
                
                h4('商业模式设计'),
                p('本项目采用Freemium（免费增值）商业模式。免费版提供基础语义搜索（端侧推理）、1000张图片索引额度、基础隐私保险箱。高级版（¥12/月或¥98/年）提供无限图片索引、云端增强推理、高级记忆功能（长期记忆/隐式记忆）、优先技术支持。收入预测（保守估计）：第一年10万付费用户×¥98/年=980万元，第三年50万付费用户×¥98/年=4900万元。'),
                ...insertImage('diagram07_business.png', '图3-11 Freemium商业模式', 480, 340),
                
                // === 3.2 排期规划 ===
                h2('3.2 排期规划'),
                p('本项目参加第十九届全国大学生软件创新大赛，比赛周期为三个月（2026年2月至5月）。基于MVP原型的验证结果，制定以下开发计划：'),
                ...insertImage('diagram06_timeline.png', '图3-12 项目开发时间线', 480, 300),
                createTable(['阶段', '时间', '核心功能', '交付物'],
                    [['Phase 1: MVP', '1月（基本完成）', '端侧/云端VLM推理、语义搜索', '可运行原型'],
                     ['Phase 2: 快速识别', '2月1日-14日', '快速OCR、二维码、场景分类', '多层处理管道'],
                     ['Phase 3: 智能感知', '2月15日-28日', '截图监听、悬浮建议、Deep Link', '主动感知能力'],
                     ['Phase 4: 记忆系统', '3月1日-21日', '层次化记忆、Reflection、偏好学习', '认知增强系统'],
                     ['Phase 5: 体验优化', '3月22日-4月11日', '隐私保险箱、UI/UX、性能优化', '参赛版本'],
                     ['作品提交', '4月12日-30日', '演示视频、文档、答辩PPT', '完整参赛材料']],
                    [2200, 2000, 3000, 1800]),
                caption('表3-3 开发阶段与交付物'),
                createTable(['里程碑', '目标日期', '验收标准'],
                    [['M1: 快速识别完成', '2月14日', 'OCR延迟<500ms，二维码识别率>95%'],
                     ['M2: 智能感知完成', '2月28日', '截图监听响应<1s，Deep Link覆盖主流App'],
                     ['M3: 记忆系统完成', '3月21日', 'Reflection推断可演示，偏好学习功能可用'],
                     ['M4: 参赛版本冻结', '4月11日', '所有核心功能稳定，无致命Bug'],
                     ['M5: 材料提交', '4月30日', '演示视频、项目文档、源代码打包完成']],
                    [2500, 2000, 4500]),
                caption('表3-4 里程碑与验收标准'),
                
                // ==================== 4 总结与展望 ====================
                new Paragraph({ children: [new PageBreak()] }),
                h1('4 总结与展望'),
                
                // === 4.1 SWOT分析 ===
                h2('4.1 SWOT战略分析'),
                h3('4.1.1 优势（Strengths）'),
                p('本项目的核心优势体现在四个维度，均有数据支撑。在隐私保护技术壁垒方面，端侧推理+加密存储的双闭环架构符合PIPL数据最小化原则，46.7%用户关注隐私问题[26]为该定位提供市场基础。在层次化记忆创新方面，竞品无同类功能，Stanford论文级技术（GitHub 20.3k stars）[20]提供理论支撑，TRL 3→7验证路径清晰。在开源生态降低成本方面，Qwen3-VL开源、MNN免费、ObjectBox社区版免费。在大学生市场契合方面，55.47%大学生愿付费订阅[25]，4763万用户基数（教育部2023年统计），高接受度和强传播力。'),
                
                h3('4.1.2 劣势（Weaknesses）'),
                p('本项目存在三个需要正视的短板及其缓解策略。在端侧推理能力受限方面，2B vs 235B参数差距明显，缓解策略为云端增强模式可选。在品牌知名度低方面，新产品面临冷启动问题，缓解策略为聚焦高校种子用户和创业大赛曝光。在团队规模方面，4人学生团队资源相对有限，缓解策略为明确分工、聚焦MVP核心功能，采用敏捷迭代方法论。'),
                
                h3('4.1.3 机会（Opportunities）'),
                p('市场环境为本项目提供了四个重要机遇。在端侧AI技术成熟方面，2025年「端-边-云」架构突破[28]，把握策略为积极适配新一代端侧芯片。在隐私法规趋严方面，2025年个人信息保护专项行动启动[29]，把握策略为合规营销差异化定位。在AI应用爆发方面，移动AI月活7.29亿[23]，把握策略为借势AI热度获取用户。在美图验证商业模式方面，付费订阅用户1540万[24]，把握策略为参考其变现路径。'),
                
                h3('4.1.4 威胁（Threats）'),
                p('本项目面临三个主要威胁及应对预案。在大厂入局方面，手机厂商AI助手用户规模达5.29亿（QuestMobile 2025年8月报告[6]），形成竞争压力，应对预案为专注细分场景，做深而非做广。在技术迭代快方面，VLM模型每季度更新，应对预案为保持架构灵活性，模型可插拔设计。在用户付费意愿不确定方面，国内工具类付费率普遍较低，应对预案为强化价值感知，提供免费试用。'),
                
                h3('4.1.5 战略组合策略'),
                p('基于SWOT矩阵，本项目制定四类战略组合。SO战略（增长型）：利用开源生态优势+端侧AI成熟机会快速迭代产品功能，借助大学生高付费意愿+AI热度在高校市场建立口碑。WO战略（扭转型）：通过云端增强模式弥补端侧能力不足，利用高校创业大赛提升品牌知名度。ST战略（多元化）：聚焦隐私敏感场景与大厂通用方案差异化，设计模块化架构快速适配新模型版本。WT战略（防御型）：MVP聚焦核心功能避免功能膨胀，建立用户反馈闭环持续优化体验。'),
                ...insertV6Chart('chart_swot_strategy.png', '图4-1 SWOT战略组合矩阵', 580, 360),
                
                // === 4.2 项目总结 ===
                h2('4.2 项目总结'),
                p('拾光是一款面向中国移动互联网用户的AI智能相册应用，致力于解决「截图囤积」这一用户痛点。本项目的核心创新在于「层次化记忆架构」——借鉴Stanford大学Generative Agents研究的Reflection机制，构建短期记忆→长期记忆→隐式记忆的三层体系，使应用能够从理解「照片是什么」跃升到理解「用户经历了什么」。用户可以通过「上次去海边的照片」这样的模糊查询找到相关图片，即使单张照片的描述中并未包含「海边」这一关键词，突破了传统相册基于时间和地点索引的局限。'),
                
                // 核心价值主张图
                ...insertV6Chart('chart_core_value.png', '图4-2 拾光核心价值主张', 560, 270),
                
                p('在隐私保护方面，系统规划默认采用端侧推理模式，所有数据处理将在用户设备本地完成，符合《个人信息保护法》的数据最小化要求；当用户需要更强理解能力时，可主动开启云端增强模式。项目当前已基本完成MVP阶段原型验证，端侧/云端VLM推理和语义搜索功能已通过可行性验证。技术可行性分析表明，核心技术均有成熟的理论基础和开源实现支撑，整体技术可行性为高。'),
                
                // 项目四大亮点图
                ...insertV6Chart('chart_highlights.png', '图4-3 项目四大亮点', 560, 220),
                
                // === 4.3 未来展望 ===
                h2('4.3 未来展望'),
                p('短期迭代（赛后1-3个月）将实现MobileCLIP以图搜图功能，通过视觉相似度检索使用户无需依赖文字描述也能找到相似图片。智能清理建议功能可识别过期二维码、重复截图等冗余内容，帮助用户释放存储空间。'),
                p('中期规划（赛后3-6个月）将实现视频流理解功能，将媒体类型支持扩展至短视频，实现视频内容的关键帧提取、语义描述生成和时间轴检索。多端加密同步功能采用WebDAV协议，用户可自主选择存储位置。'),
                p('长期愿景聚焦三个方向：个性化LoRA微调将探索端侧收集、云侧训练的技术路径；Agentic OS融合将探索与手机厂商Agent生态的深度整合；老年防诈应用将研究自动识别诈骗信息截图并发送预警的功能。'),
                
                // 未来发展路线图
                ...insertV6Chart('chart_future_roadmap.png', '图4-4 拾光未来发展路线图', 600, 260),
                
                // ==================== 参考资料 ====================
                new Paragraph({ children: [new PageBreak()] }),
                h1('参考资料'),
                ref('[1] 新华日报. 照片、聊天记录…你电子囤物吗，"存上就尽在掌握"？[N]. 2024-11.'),
                ref('[2] Zhang L, et al. Exploration of factors of digital photo hoarding behavior among university students[J]. Frontiers in Psychology, 2025, 16: 1607274.'),
                ref('[3] IDC. Worldwide AI Smartphone Forecast, 2025–2029[R]. 2025.'),
                ref('[4] Park J S, et al. Generative agents: Interactive simulacra of human behavior[C]. UIST 2023. ACM, 2023: 1-22.'),
                ref('[5] 汉斯出版社. 当代青年数字囤积行为现状调查与分析[J]. Advances in Psychology, 2024, 14(4): 591-598.'),
                ref('[6] QuestMobile. 2025年中国AI终端生态发展研究报告[R]. 2025.'),
                ref('[7] QuestMobile. 2025年8月AI应用行业月度报告[R]. 2025-09.'),
                ref('[8] 中华人民共和国工业和信息化部. 2025年1-9月国内手机出货量统计[R]. 2025.'),
                ref('[9] 全国人民代表大会常务委员会. 中华人民共和国个人信息保护法[S]. 2021-08-20.'),
                ref('[10] Wang Y, et al. Hoarding knowledge or hoarding stress? Investigating the link between digital hoarding and cognitive failures[J]. Frontiers in Psychology, 2024, 15: 1518860.'),
                ref('[11] Liu Y, et al. RoboMemory: A Brain-inspired Multi-memory Agentic Framework[J]. arXiv:2508.01415, 2025.'),
                ref('[12] Malkov Y A, Yashunin D A. Efficient and robust approximate nearest neighbor search using HNSW[J]. IEEE TPAMI, 2018, 42(4): 824-836.'),
                ref('[13] ObjectBox. The on-device Vector Database for Android and Java[EB/OL]. https://objectbox.io/, 2024.'),
                ref('[14] Jégou H, Douze M, Schmid C. Product quantization for nearest neighbor search[J]. IEEE TPAMI, 2010, 33(1): 117-128.'),
                ref('[15] StackOverflow. Speed of decoding ZXing and ZBar in android[EB/OL]. 2014-2024.'),
                ref('[16] Google Developers. Recognize text in images with ML Kit on Android[EB/OL]. 2024.'),
                ref('[17] Google Developers. Create deep links[EB/OL]. https://developer.android.com/training/app-links/, 2024.'),
                ref('[18] Google Developers. EncryptedFile API Reference[EB/OL]. 2024.'),
                ref('[19] Google Developers. Show a biometric authentication dialog[EB/OL]. 2024.'),
                ref('[20] Park JS, et al. Generative Agents: Interactive Simulacra of Human Behavior[C]. UIST 2023. GitHub: joonspk-research/generative_agents.'),
                ref('[21] DakeQQ. Native-LLM-for-Android: Demonstration of running a native LLM on Android device[EB/OL]. GitHub, 2025-2026.'),
                ref('[22] Google Developers. Add Recommendations to your app with TensorFlow Lite and Firebase[EB/OL]. Firebase Codelabs, 2024.'),
                ref('[23] QuestMobile. 2025年9月AI应用行业月度报告[R]. QuestMobile, 2025.'),
                ref('[24] 美图公司. 美图公司2025年中期业绩公告[R]. 2025.'),
                ref('[25] 第一财经. 大学生"冲浪"调研报告：超50%愿意为APP"氪金"[EB/OL]. 2024.'),
                ref('[26] 中国公众AI使用调研. 中国公众对生成式AI的看法与使用行为年度调研[R]. 2025.'),
                ref('[27] Google One. Plans & Pricing to Upgrade Your Cloud Storage[EB/OL]. 2025.'),
                ref('[28] QuestMobile. 2025年中国AI终端生态发展研究报告[R]. QuestMobile, 2025.'),
                ref('[29] 中央网信办等. 关于开展2025年个人信息保护系列专项行动的公告[EB/OL]. 2025.'),
                ref('[30] TechCrunch. Google Photos adds new AI features for editing[EB/OL]. 2025-11-11.'),
                ref('[31] PCMag. Apple Intelligence for Photos Tested[EB/OL]. 2024.'),
                ref('[32] Apple Inc. Photos & Privacy[EB/OL]. https://www.apple.com/legal/privacy/, 2024.'),
                ref('[33] Google Developers. Google AI Edge SDK Documentation[EB/OL]. 2024.'),
                ref('[34] IDC. Worldwide Generative AI Smartphone Forecast, 2024-2028[R]. 2024.'),
                ref('[35] Canalys. Now and Next for AI-capable Smartphones[R]. 2024.'),
                ref('[36] Zhang H, et al. MNN-LLM: A Generic Inference Engine for Fast LLM Deployment on Mobile Devices[C]. ACM MM Asia 2024.'),
                ref('[37] Wang X, et al. Mobile-Agent-E: Self-Evolving Mobile Assistant for Complex Tasks[J]. arXiv:2501.11733, 2025.'),
                ref('[38] Zhang Y, et al. MobiAgent: A Systematic Framework for Customizable Mobile Agents[J]. arXiv:2509.00531, 2025.'),
                ref('[39] Pal S, et al. User Modeling and User Profiling: A Comprehensive Survey[J]. arXiv:2402.09660, 2024.'),
                ref('[40] Spotify Research. Generalized user representations for large-scale recommendations[EB/OL]. 2025.'),
                
                // ==================== 附录 ====================
                new Paragraph({ children: [new PageBreak()] }),
                h1('附录'),
                h2('附录A 术语表'),
                createTable(['术语', '定义'],
                    [['VLM', '视觉语言模型（Vision-Language Model），能够同时理解图像和文本的多模态AI模型'],
                     ['MNN', '阿里巴巴开源的移动神经网络框架（Mobile Neural Network）'],
                     ['TRL', '技术成熟度等级（Technology Readiness Level），评估技术发展阶段的标准'],
                     ['PIPL', '中华人民共和国个人信息保护法（Personal Information Protection Law）'],
                     ['Reflection', 'Stanford Generative Agents研究中的反思机制，用于从低级观察推断高级洞察'],
                     ['HNSW', '分层可导航小世界图（Hierarchical Navigable Small World），一种高效的近似最近邻搜索算法'],
                     ['PQ', '乘积量化（Product Quantization），向量压缩技术'],
                     ['Deep Link', '深度链接，允许从一个应用直接跳转到另一个应用特定页面的技术']],
                    [2500, 6500]),
                caption('表A-1 术语表'),
                
                h2('附录B 技术规格'),
                createTable(['参数', '规格'],
                    [['端侧模型', 'Qwen3-VL-2B-Instruct (MNN格式, INT4量化)'],
                     ['云端模型', 'Qwen3-VL-235B-A22B-Thinking (SiliconFlow API)'],
                     ['向量维度', '384维（MiniLM-L6-v2）'],
                     ['模型大小', '约1.37GB（端侧）'],
                     ['最低内存', '4GB RAM'],
                     ['首Token延迟', '约3224ms（骁龙8 Gen 3）'],
                     ['解码速度', '14.0 tokens/s（骁龙8 Gen 3）']],
                    [3000, 6000]),
                caption('表B-1 技术规格'),
                
                h2('附录C 开发环境'),
                createTable(['类别', '工具/版本'],
                    [['开发语言', 'Kotlin 1.9+, Python 3.11'],
                     ['开发框架', 'Jetpack Compose, MNN Framework'],
                     ['目标平台', 'Android 10+ (API 29+)'],
                     ['数据库', 'ObjectBox 3.8+ (内置HNSW)'],
                     ['云服务', 'SiliconFlow API (Qwen3-VL)'],
                     ['版本控制', 'Git + GitHub'],
                     ['CI/CD', 'GitHub Actions'],
                     ['设计工具', 'Figma, Adobe XD']],
                    [3000, 6000]),
                caption('表C-1 开发环境配置'),
                
                ...emptyLine(2),
                new Paragraph({ alignment: AlignmentType.RIGHT,
                    children: [new TextRun({ text: '本文档最后更新：2026年2月1日', font: 'SimSun', size: 20, italics: true })] })
            ]
        }
    ]
});

// 导出文档
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(path.join(__dirname, '拾光-项目计划书-完整版-v34-引用重排.docx'), buffer);
    console.log('文档生成成功：拾光-项目计划书-完整版-v34-引用重排.docx');
}).catch(err => console.error('生成失败:', err));
