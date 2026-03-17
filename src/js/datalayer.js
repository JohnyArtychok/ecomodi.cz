var shopDataLayer = {
    footer: {
        newsletter: {
            title: "Získejte 15% slevu na první nákup",
            icon: "/user/documents/upload/kodovani/mail.svg",
            subtitle: "Přihlaste se k odběru našeho newsletteru a získejte exkluzivní slevy, tipy a novinky přímo do vaší schránky",
            placeholder: "Váš e-mail",
            
        },
    },
    productDetail: {
        readWholeDescription: "Přečíst detailní popisek",
        tabs: {
            descriptionTab: "Popis produktu",
            parametersTab: "Parametry",
        },
        variants: {
            addedInfo: [
                {
                    id: 5,
                    linkText: "Jak vybrat správnou velikost?",
                    linkContent: [
                        {
                            type: "premium",
                            content: `<div class="sizes" data-strih="premium">
    <h2>Velikostní tabulka</h2>
    <div class="sizes-inner">
        <div class="sizes-left">
            <table class="size-table">
                <thead>
                    <tr>
                        <th>Velikost</th>
                        <th>Obvod pasu</th>
                        <th>Obvod boků</th>
                        <th>Rozměry kalhotek*</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>XS</td>
                        <td>60 – 64 cm</td>
                        <td>81 – 87 cm</td>
                        <td>29–32 cm / 22 cm</td>
                    </tr>
                    <tr>
                        <td>S</td>
                        <td>64 – 69 cm</td>
                        <td>87 – 94 cm</td>
                        <td>29–32 cm / 22 cm</td>
                    </tr>
                    <tr>
                        <td>M</td>
                        <td>69 – 74 cm</td>
                        <td>93 – 101 cm</td>
                        <td>29–32 cm / 22 cm</td>
                    </tr>
                    <tr>
                        <td>L</td>
                        <td>74 – 80 cm</td>
                        <td>101 – 109 cm</td>
                        <td>29–32 cm / 22 cm</td>
                    </tr>
                    <tr>
                        <td>XL</td>
                        <td>79 – 85 cm</td>
                        <td>107 – 115 cm</td>
                        <td>29–32 cm / 22 cm</td>
                    </tr>
                    <tr>
                        <td>XXL</td>
                        <td>85 – 92 cm</td>
                        <td>115 – 124 cm</td>
                        <td>29–32 cm / 22 cm</td>
                    </tr>
                </tbody>
            </table>
            <div class="special">Rozměry uvádíme pro možnost porovnání s padnoucím spodním prídlem. Jedná se o šířku nenatažené gumy kalhotek / výšku kalhotek</div>
        </div>
        <div class="sizes-right">
            <img src="/user/documents/upload/kodovani/strihy/strih-premium.png" alt="Strih Premium">
            <span class="sizes-right__note">Rozepínací střih PREMIUM</span>
        </div>
    </div>
</div>`
                        },
                        {
                            type: "extra-vysoke-pohodlne",
                            content: `<div class="sizes" data-strih="extra-vysoke-pohodlne">
    <h2>Velikostní tabulka</h2>
    <div class="sizes-inner">
        <div class="sizes-left">
            <table class="size-table">
                <thead>
                    <tr>
                        <th>Velikost</th>
                        <th>Obvod pasu</th>
                        <th>Obvod boků</th>
                        <th><span class="size-table__ref">A/B</span> Rozměry kalhotek *</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>XS</td>
                        <td>60 – 64 cm</td>
                        <td>81 – 88 cm</td>
                        <td>29 / 28 cm</td>
                    </tr>
                    <tr>
                        <td>S</td>
                        <td>65 – 70 cm</td>
                        <td>88 – 95 cm</td>
                        <td>31,5 / 29 cm</td>
                    </tr>
                    <tr>
                        <td>M</td>
                        <td>70 – 75 cm</td>
                        <td>95 – 103 cm</td>
                        <td>34 / 31 cm</td>
                    </tr>
                    <tr>
                        <td>L</td>
                        <td>76 – 82 cm</td>
                        <td>103 – 111 cm</td>
                        <td>37 / 33 cm</td>
                    </tr>
                    <tr>
                        <td>XL</td>
                        <td>80 – 86 cm</td>
                        <td>109 – 118 cm</td>
                        <td>39 / 35 cm</td>
                    </tr>
                    <tr>
                        <td>XXL</td>
                        <td>84 – 91 cm</td>
                        <td>115 – 124 cm</td>
                        <td>41 / 36 cm</td>
                    </tr>
                    <tr>
                        <td>XXXL</td>
                        <td>91 – 98 cm</td>
                        <td>123 – 133 cm</td>
                        <td>44 / 37 cm</td>
                    </tr>
                    <tr>
                        <td>4XL</td>
                        <td>97 – 104 cm</td>
                        <td>132 – 142 cm</td>
                        <td>47 / 39 cm</td>
                    </tr>
                    <tr>
                        <td>5XL</td>
                        <td>101 – 109 cm</td>
                        <td>137 – 148 cm</td>
                        <td>49 / 40 cm</td>
                    </tr>
                </tbody>
            </table>
            <div class="special">Rozměry uvádíme pro možnost porovnání s padnoucím spodním prídlem. Jedná se o šířku nenatažené gumy kalhotek / výšku kalhotek</div>
        </div>
        <div class="sizes-right">
            <img src="/user/documents/upload/kodovani/strihy/extra-vysoke-pohodlne.png" alt="Strih Extra vysoké pohodlné">
            <span class="sizes-right__note">Extra vysoké pohodlné</span>
        </div>
    </div>
</div>`
                        },
                        {
                            type: "klasicky-strih",
                            content: `<div class="sizes" data-strih="klasicky-strih">
    <h2>Velikostní tabulka</h2>
    <div class="sizes-inner">
        <div class="sizes-left">
            <table class="size-table">
                <thead>
                    <tr>
                        <th>Velikost</th>
                        <th>Obvod pasu</th>
                        <th>Obvod boků</th>
                        <th><span class="size-table__ref">A/B</span> Rozměry kalhotek *</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>XXS</td>
                        <td>do 59 cm</td>
                        <td>do 80 cm</td>
                        <td>26,5 / 21 cm</td>
                    </tr>
                    <tr>
                        <td>XS</td>
                        <td>60 – 64 cm</td>
                        <td>81 – 87 cm</td>
                        <td>29 / 22 cm</td>
                    </tr>
                    <tr>
                        <td>S</td>
                        <td>65 – 70 cm</td>
                        <td>88 – 95 cm</td>
                        <td>31,5 / 23 cm</td>
                    </tr>
                    <tr>
                        <td>M</td>
                        <td>70 – 76 cm</td>
                        <td>95 – 102 cm</td>
                        <td>34 / 24 cm</td>
                    </tr>
                    <tr>
                        <td>L</td>
                        <td>75 – 81 cm</td>
                        <td>102 – 110 cm</td>
                        <td>36,5 / 25 cm</td>
                    </tr>
                    <tr>
                        <td>XL</td>
                        <td>80 – 87 cm</td>
                        <td>109 – 118 cm</td>
                        <td>39 / 27 cm</td>
                    </tr>
                    <tr>
                        <td>XXL</td>
                        <td>86 – 93 cm</td>
                        <td>117 – 127 cm</td>
                        <td>42 / 28 cm</td>
                    </tr>
                    <tr>
                        <td>XXXL</td>
                        <td>93 – 100 cm</td>
                        <td>126 – 136 cm</td>
                        <td>45 / 29 cm</td>
                    </tr>
                </tbody>
            </table>
            <div class="special">Rozměry uvádíme pro možnost porovnání s padnoucím spodním prídlem. Jedná se o šířku nenatažené gumy kalhotek / výšku kalhotek</div>
        </div>
        <div class="sizes-right">
            <img src="/user/documents/upload/kodovani/strihy/klasicky-strih.png" alt="Strih Klasický">
            <span class="sizes-right__note">Klasický střih</span>
        </div>
    </div>
</div>`
                        },
                        {
                            type: "vysoky-pas",
                            content: `<div class="sizes" data-strih="vysoky-pas">
    <h2>Velikostní tabulka</h2>
    <div class="sizes-inner">
        <div class="sizes-left">
            <table class="size-table">
                <thead>
                    <tr>
                        <th>Velikost</th>
                        <th>Obvod pasu</th>
                        <th>Obvod boků</th>
                        <th><span class="size-table__ref">A/B</span> Rozměry kalhotek *</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>XXS</td>
                        <td>do 58 cm</td>
                        <td>do 79 cm</td>
                        <td>26 / 22 cm</td>
                    </tr>
                    <tr>
                        <td>XS</td>
                        <td>58 – 62 cm</td>
                        <td>78 – 85 cm</td>
                        <td>28 / 23 cm</td>
                    </tr>
                    <tr>
                        <td>S</td>
                        <td>63 – 68 cm</td>
                        <td>86 – 94 cm</td>
                        <td>31 / 25 cm</td>
                    </tr>
                    <tr>
                        <td>M</td>
                        <td>68 – 73 cm</td>
                        <td>93 – 100 cm</td>
                        <td>33 / 26 cm</td>
                    </tr>
                    <tr>
                        <td>L</td>
                        <td>74 – 79 cm</td>
                        <td>100 – 109 cm</td>
                        <td>36 / 28 cm</td>
                    </tr>
                    <tr>
                        <td>XL</td>
                        <td>78 – 84 cm</td>
                        <td>107 – 114 cm</td>
                        <td>38 / 29 cm</td>
                    </tr>
                    <tr>
                        <td>XXL</td>
                        <td>84 – 91 cm</td>
                        <td>115 – 124 cm</td>
                        <td>41 / 31 cm</td>
                    </tr>
                    <tr>
                        <td>XXXL</td>
                        <td>90 – 97 cm</td>
                        <td>123 – 131 cm</td>
                        <td>44 / 32 cm</td>
                    </tr>
                    <tr>
                        <td>4XL</td>
                        <td>95 – 102 cm</td>
                        <td>129 – 139 cm</td>
                        <td>46 / 34 cm</td>
                    </tr>
                    <tr>
                        <td>5XL</td>
                        <td>99 – 107 cm</td>
                        <td>135 – 145 cm</td>
                        <td>48 / 35 cm</td>
                    </tr>
                </tbody>
            </table>
            <div class="special">Rozměry uvádíme pro možnost porovnání s padnoucím spodním prídlem. Jedná se o šířku nenatažené gumy kalhotek / výšku kalhotek</div>
        </div>
        <div class="sizes-right">
            <img src="/user/documents/upload/kodovani/strihy/vysoky-pas.png" alt="Strih Vysoký pas">
            <span class="sizes-right__note">Vysoký pas</span>
        </div>
    </div>
</div>`
                        },
                        {
                            type: "nohavickove",
                            content: `<div class="sizes" data-strih="nohavickove">
    <h2>Velikostní tabulka</h2>
    <div class="sizes-inner">
        <div class="sizes-left">
            <table class="size-table">
                <thead>
                    <tr>
                        <th>Velikost</th>
                        <th>Obvod pasu</th>
                        <th>Obvod boků</th>
                        <th><span class="size-table__ref">A/B</span> Rozměry kalhotek *</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>XXS</td>
                        <td>do 59 cm</td>
                        <td>do 80 cm</td>
                        <td>26,5 / 24 cm</td>
                    </tr>
                    <tr>
                        <td>XS</td>
                        <td>60 – 64 cm</td>
                        <td>81 – 87 cm</td>
                        <td>29 / 25 cm</td>
                    </tr>
                    <tr>
                        <td>S</td>
                        <td>65 – 70 cm</td>
                        <td>88 – 95 cm</td>
                        <td>31,5 / 26 cm</td>
                    </tr>
                    <tr>
                        <td>M</td>
                        <td>70 – 76 cm</td>
                        <td>95 – 102 cm</td>
                        <td>34 / 27 cm</td>
                    </tr>
                    <tr>
                        <td>L</td>
                        <td>75 – 81 cm</td>
                        <td>102 – 110 cm</td>
                        <td>36,5 / 27 cm</td>
                    </tr>
                    <tr>
                        <td>XL</td>
                        <td>80 – 87 cm</td>
                        <td>109 – 118 cm</td>
                        <td>39 / 28 cm</td>
                    </tr>
                    <tr>
                        <td>XXL</td>
                        <td>86 – 93 cm</td>
                        <td>117 – 127 cm</td>
                        <td>42 / 28 cm</td>
                    </tr>
                    <tr>
                        <td>XXXL</td>
                        <td>93 – 100 cm</td>
                        <td>126 – 136 cm</td>
                        <td>45 / 29 cm</td>
                    </tr>
                </tbody>
            </table>
            <div class="special">Rozměry uvádíme pro možnost porovnání s padnoucím spodním prídlem. Jedná se o šířku nenatažené gumy kalhotek / výšku kalhotek</div>
        </div>
        <div class="sizes-right">
            <img src="/user/documents/upload/kodovani/strihy/nohavickove.png" alt="Strih Nohavičkové">
            <span class="sizes-right__note">Nohavičkové</span>
        </div>
    </div>
</div>`
                        },
                        {
                            type: "tanga",
                            content: `<div class="sizes" data-strih="tanga">
    <h2>Velikostní tabulka</h2>
    <div class="sizes-inner">
        <div class="sizes-left">
            <table class="size-table">
                <thead>
                    <tr>
                        <th>Velikost</th>
                        <th>Obvod pasu</th>
                        <th>Obvod boků</th>
                        <th><span class="size-table__ref">A/B</span> Rozměry kalhotek *</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>XXS</td>
                        <td>do 56 cm</td>
                        <td>do 76 cm</td>
                        <td>25 / 16 cm</td>
                    </tr>
                    <tr>
                        <td>XS</td>
                        <td>55 – 60 cm</td>
                        <td>76 – 82 cm</td>
                        <td>27 / 18 cm</td>
                    </tr>
                    <tr>
                        <td>S</td>
                        <td>59 – 64 cm</td>
                        <td>81 – 87 cm</td>
                        <td>29 / 20 cm</td>
                    </tr>
                    <tr>
                        <td>M</td>
                        <td>64 – 69 cm</td>
                        <td>87 – 94 cm</td>
                        <td>31 / 21 cm</td>
                    </tr>
                    <tr>
                        <td>L</td>
                        <td>70 – 75 cm</td>
                        <td>95 – 102 cm</td>
                        <td>34 / 22 cm</td>
                    </tr>
                    <tr>
                        <td>XL</td>
                        <td>74 – 80 cm</td>
                        <td>101 – 109 cm</td>
                        <td>36 / 24 cm</td>
                    </tr>
                    <tr>
                        <td>XXL</td>
                        <td>78 – 84 cm</td>
                        <td>107 – 115 cm</td>
                        <td>38 / 26 cm</td>
                    </tr>
                    <tr>
                        <td>XXXL</td>
                        <td>84 – 91 cm</td>
                        <td>115 – 124 cm</td>
                        <td>41 / 27 cm</td>
                    </tr>
                </tbody>
            </table>
            <div class="special">Rozměry uvádíme pro možnost porovnání s padnoucím spodním prídlem. Jedná se o šířku nenatažené gumy kalhotek / výšku kalhotek</div>
        </div>
        <div class="sizes-right">
            <img src="/user/documents/upload/kodovani/strihy/tanga.png" alt="Strih Tanga">
            <span class="sizes-right__note">Tanga</span>
        </div>
    </div>
</div>`
                        },
                        {
                            type: "boxerky",
                            content: `<div class="sizes" data-strih="boxerky">
    <h2>Velikostní tabulka</h2>
    <div class="sizes-inner">
        <div class="sizes-left">
            <table class="size-table">
                <thead>
                    <tr>
                        <th>Velikost</th>
                        <th>Obvod pasu (CM)</th>
                        <th><span class="size-table__ref">A/B</span> * Nenatažený rozměr prádla v pase (CM)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>XS</td>
                        <td>66 – 72</td>
                        <td>32</td>
                    </tr>
                    <tr>
                        <td>S</td>
                        <td>72 – 80</td>
                        <td>35</td>
                    </tr>
                    <tr>
                        <td>M</td>
                        <td>80 – 88</td>
                        <td>37,5</td>
                    </tr>
                    <tr>
                        <td>L</td>
                        <td>88 – 96</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td>XL</td>
                        <td>96 – 104</td>
                        <td>42,5</td>
                    </tr>
                    <tr>
                        <td>XXL</td>
                        <td>104 – 112</td>
                        <td>45,5</td>
                    </tr>
                    <tr>
                        <td>XXXL</td>
                        <td>112 – 120</td>
                        <td>48</td>
                    </tr>
                </tbody>
            </table>
            <div class="special">Rozměry uvádíme pro možnost porovnání s padnoucím spodním prádlem. Jedná se o šířku nenatažené gumy.</div>
        </div>
        <div class="sizes-right">
            <img src="/user/documents/upload/kodovani/strihy/boxerky.png" alt="Strih Boxerky">
            <span class="sizes-right__note">Pánské inkontinenční pratelné BOXERKY</span>
        </div>
    </div>
</div>`
                        },
                        {
                            type: "slipy",
                            content: `<div class="sizes" data-strih="slipy">
    <h2>Velikostní tabulka</h2>
    <div class="sizes-inner">
        <div class="sizes-left">
            <table class="size-table">
                <thead>
                    <tr>
                        <th>Velikost</th>
                        <th>Obvod pasu (CM)</th>
                        <th><span class="size-table__ref">A/B</span> * Nenatažený rozměr prádla v pase (CM)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>XS</td>
                        <td>66 – 72</td>
                        <td>32</td>
                    </tr>
                    <tr>
                        <td>S</td>
                        <td>72 – 80</td>
                        <td>35</td>
                    </tr>
                    <tr>
                        <td>M</td>
                        <td>80 – 88</td>
                        <td>37,5</td>
                    </tr>
                    <tr>
                        <td>L</td>
                        <td>88 – 96</td>
                        <td>40,5</td>
                    </tr>
                    <tr>
                        <td>XL</td>
                        <td>96 – 104</td>
                        <td>43</td>
                    </tr>
                    <tr>
                        <td>XXL</td>
                        <td>104 – 112</td>
                        <td>45,5</td>
                    </tr>
                    <tr>
                        <td>XXXL</td>
                        <td>112 – 120</td>
                        <td>48</td>
                    </tr>
                </tbody>
            </table>
            <div class="special">Rozměry uvádíme pro možnost porovnání s padnoucím spodním prádlem. Jedná se o šířku nenatažené gumy.</div>
        </div>
        <div class="sizes-right">
            <img src="/user/documents/upload/kodovani/strihy/slipy.png" alt="Strih Slipy">
            <span class="sizes-right__note">Pánské inkontinenční pratelné SLIPY </span>
        </div>
    </div>
</div>`
                        }
                    ],
                },
                {
                    id: 17,
                    linkText: "Jakou absorbci zvolit?",
                    linkContent: `
                        <div class="absorpction">
                            <h2>Jakou absorbci zvolit?</h2>
                            <p>Pratelné inkontinenční prádlo Ecomodi vyrábíme v několika sacích (absorpčních) třídách. Liší se střihem a plochou absorpční části. Nejprodávanější je sací třida silná a extra silná.</p>
                            <div class="absorpction-types">
                                <div class="absorpction-type">
                                    <h4>Slabá</h4>
                                    <img src="/user/documents/upload/kodovani/slaba-absorpce.svg?v=1.01" alt="Střední absorpce">
                                    <h5>Až <span>30 ml</span> moči (modely Premium)</h5>
                                    <p>Ideální na běžné nošení během dne. Klín kalhotek je složen z kontaktní savé vrstvy, vnitřní vrstvy zadržující tekutinu a nepropustné membrány.</p>
                                </div>
                                <div class="absorpction-type">
                                    <h4>Střední</h4>
                                    <img src="/user/documents/upload/kodovani/stredni-absorpce.svg?v=1.01" alt="Střední absorpce">
                                    <h5>Až <span>30 ml</span> moči (modely Premium)</h5>
                                    <p>Ideální na běžné nošení během dne. Klín kalhotek je složen z kontaktní savé vrstvy, vnitřní vrstvy zadržující tekutinu a nepropustné membrány.</p>
                                </div>
                                <div class="absorpction-type">
                                    <h4>Silná</h4>
                                    <img src="/user/documents/upload/kodovani/silna-absorpce.svg?v=1.01" alt="Silná absorpce">
                                    <h5>Až <span>50 ml</span> moči (modely Premium)</h5>
                                    <p>Ideální na běžné nošení během dne. Klín kalhotek je složen z kontaktní savé vrstvy, vnitřní zesílené vrstvy zadržující tekutinu a nepropustné membrány.</p>
                                </div>
                                <div class="absorpction-type">
                                    <h4>Extra silná</h4>
                                    <img src="/user/documents/upload/kodovani/extra-silna-absorpce.svg?v=1.01" alt="Extra silná absorpce">
                                    <h5>Až <span>100 ml</span> moči (modely Premium)</h5>
                                    <p>Kromě denního nošení je tato třída vhodná i na noc. POZOR tento typ prádla má na zadní straně zvýšený klín. Klín je složen z kontaktní savé vrstvy, vnitřní zesílené vrstvy zadržující tekutinu a nepropustné membrány.</p>
                                </div>
                            </div>
                        </div>

                    `,
                    options: {
                        26: "/user/documents/upload/kodovani/slaba-absorpce.svg?v=1.01",
                        29: "/user/documents/upload/kodovani/stredni-absorpce.svg?v=1.01",
                        14: "/user/documents/upload/kodovani/silna-absorpce.svg?v=1.01",
                        32: "/user/documents/upload/kodovani/extra-silna-absorpce.svg?v=1.01"
                    }
                },
            ]
        }
    }
};
