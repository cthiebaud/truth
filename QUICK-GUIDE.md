# Aletheia

The goal of the game is to uncover the 'truth' in each and every of the sixteen 'truth tables'. Together, these tables represent every possible combination of two boolean entries.

The header of each table provides a clue that can be decoded into bricks filling none, some or all of the 4 cells within the box.

The presence or absence of a brick within a cell is fully determined by the values of A and B as inferred from the clue, as illustrated below:

<div id="tables" class="center-children the-font-for-tables d-flex justify-content-around">
    <div id="element3" data-function="α &amp; β">
        <table class="table inline table-sm caption-top table-borderless">
            <caption id="AetB" class="text-center">𝖠 ∧ 𝖡</caption>
            <thead id="thead3">
                <tr>
                    <th style="display: table-cell;">
                        <div class="diagonal-line">&nbsp;</div>
                    </th>
                    <th style="display: table-cell;">true</th>
                    <th style="display: table-cell;">false</th>
                </tr>
            </thead>
            <tbody id="tbody3">
                <tr>
                    <th style="display: table-cell;">
                        <div class="vertical-text">true</div>
                    </th>
                    <td class="true" style="background-color: rgb(180, 0, 0); color: rgb(165, 0, 0);"></td>
                    <td class="false translucent" style="background-color: transparent;"></td>
                </tr>
                <tr>
                    <th style="display: table-cell;">
                        <div class="vertical-text">false</div>
                    </th>
                    <td class="false translucent" style="background-color: transparent;"></td>
                    <td class="false translucent" style="background-color: transparent;"></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="element15" data-function="α | β">
        <table class="table inline table-sm caption-top table-borderless">
            <caption id="AouB" class="text-center">𝖠 ∨ 𝖡</caption>
            <thead id="thead15">
                <tr>
                    <th style="display: table-cell;">
                        <div class="diagonal-line">&nbsp;</div>
                    </th>
                    <th style="display: table-cell;">true</th>
                    <th style="display: table-cell;">false</th>
                </tr>
            </thead>
            <tbody id="tbody15">
                <tr>
                    <th style="display: table-cell;">
                        <div class="vertical-text">true</div>
                    </th>
                    <td class="true" style="background-color: rgb(0, 133, 43); color: rgb(0, 118, 38);"></td>
                    <td class="true" style="background-color: rgb(0, 133, 43); color: rgb(0, 118, 38);"></td>
                </tr>
                <tr>
                    <th style="display: table-cell;">
                        <div class="vertical-text">false</div>
                    </th>
                    <td class="true" style="background-color: rgb(0, 133, 43); color: rgb(0, 118, 38);"></td>
                    <td class="false translucent" style="background-color: transparent;"></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="element17" data-function="!α | !β">
        <table class="table inline table-sm caption-top table-borderless">
            <caption id="nonAounonB" class="text-center"><span class="negation canonical">𝖠</span> ∨ <span class="negation canonical">𝖡</span></caption>
            <thead id="thead17">
                <tr>
                    <th style="display: table-cell;">
                        <div class="diagonal-line">&nbsp;</div>
                    </th>
                    <th style="display: table-cell;">true</th>
                    <th style="display: table-cell;">false</th>
                </tr>
            </thead>
            <tbody id="tbody17">
                <tr>
                    <th style="display: table-cell;">
                        <div class="vertical-text">true</div>
                    </th>
                    <td class="false translucent" style="background-color: transparent;"></td>
                    <td class="true" style="background-color: rgb(30, 90, 168); color: rgb(28, 83, 155);"></td>
                </tr>
                <tr>
                    <th style="display: table-cell;">
                        <div class="vertical-text">false</div>
                    </th>
                    <td class="true" style="background-color: rgb(30, 90, 168); color: rgb(28, 83, 155);"></td>
                    <td class="true" style="background-color: rgb(30, 90, 168); color: rgb(28, 83, 155);"></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<!--
[logic symbols](https://en.wikipedia.org/wiki/List_of_logic_symbols)
[javascript expressions](https://en.wikipedia.org/wiki/List_of_logic_symbols)
-->

<sub><i>NB. The clue can be stated as 
<a id="logic_symbols" class="logic_symbols_OR_javascript_expressions" href="#" style="font-weight: bold;">logic symbols</a>
or 
<a id="javascript_expressions" class="logic_symbols_OR_javascript_expressions" href="#">javascript expressions</a>
</i>
</sub>

The aim of the game is to unconceal all the true values ​​by clicking only on the cells containing a colored brick.

<!---
Making mistakes doesn't hurt, but striving for accuracy enhances the overall enjoyment of the game, particularly with the textual and auditory rewards when finished.
-->

More at [Github&hellip;](https://github.com/cthiebaud/truth/blob/main/README.md)

&copy; 2024 [Christophe Thiebaud](https://cthiebaud.com/) *No Rights Reserved*

---

### Links

|                                                          |                                                                                                                        |
| :------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| ![Apple App Store](assets/svg/Apple_logo_grey.svg)       | [On iPhone and iPad](https://apps.apple.com/us/app/aletheia-by-%C3%A6quologica/id6476017817)                           |
| ![Android App Store](assets/svg/android-svgrepo-com.svg) | [On Android Phones & Devices](https://play.google.com/store/apps/details?id=com.cthiebaud.aletheia.twa)                |
| ![WWW](assets/svg/internet-svgrepo-com.svg)              | [On the Web](https://aletheia.cthiebaud.com/)                                                                          |
| ![aletheia](assets/svg/Wikipedia's_W.svg)                | [Aletheia (Ancient Greek: ἀλήθεια) as Philosophical Term on Wikipedia ](https://en.wikipedia.org/wiki/Aletheia)        |
| ![Github](assets/svg/github.svg)                         | This version git commit: [3623a19](https://github.com/cthiebaud/truth/commit/3623a19b2f60f218df23106be8bd5d3bbcfc14e2)            |